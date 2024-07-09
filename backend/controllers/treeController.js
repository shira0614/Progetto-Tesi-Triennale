const Tree = require('../models/treeModel')
const Replica = require('../models/replicaModel')
const fs = require('fs');
const multer = require("multer");
const upload = multer({ dest: './uploads/' });


module.exports = {
    addTree: async (req, res) => {
        console.log('Request files:', req.file);
        console.log('Request body:', req.body);

        const local_tree = {
            cultivar: req.body.cultivar,
            owner: req.userId,
            specieNomeComune: req.body.specieNomeComune,
            specieNomeScientifico: req.body.specieNomeScientifico,
            sottospecie: req.body.sottospecie,
            inoculated: req.body.inoculated,
            infectionType: req.body.infectionType,
            timestamp: req.body.timestamp ? req.body.timestamp : new Date(),
            notes: req.body.notes,
            lastReplicaId: 0
        }

        try {
            const tree = await Tree.create(local_tree)
            if(req.file){
                tree.image = {
                    data: fs.readFileSync(req.file.path),
                    contentType: req.file.mimetype
                };
                await tree.save()
                fs.unlinkSync(req.file.path);
            } else {
                await tree.save()
            }
            res.json({"message": "Tree inserted", "tree": tree, "success": true})
        } catch (err) {
            res.status(500).json({message: err.message, "success": false})
        }
    },

    getTrees: async (req, res) => {
        try {
            const trees = await Tree.find({
                owner: req.userId
            }).populate('replicas')
            if(!trees) {
                res.status(404).json({message: "Trees not found"})
            }

            const treesWithImages = trees.map(tree => {
                let imageUrl = null;
                if (tree.image && tree.image.data) {
                    const base64Image = tree.image.data.toString('base64');
                    imageUrl = `data:${tree.image.contentType};base64,${base64Image}`;
                }
                return { ...tree._doc, imageUrl };
            });

            res.json(treesWithImages)

        } catch (err) {
            res.status(500).json({message: err.message})
        }
        
    },

    getTree: async (req, res) => {
        try {
            const tree = await Tree.findOne({
                _id: req.params.treeId
            }).populate('replicas')
            if(!tree) {
                res.status(404).json({message: "Tree not found"})
            }
            console.log('Image data:', tree.image && tree.image.data);
            let imageUrl = null;
            if (tree.image && tree.image.data) {
                const base64Image = tree.image.data.toString('base64');
                imageUrl = `data:${tree.image.contentType};base64,${base64Image}`;
            }

            res.json({ "tree": tree, "imageUrl": imageUrl });
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    },

    getReplicas: async (req, res) => {
        try {
            const replicas = await Replica.find({
                treeId: req.params.treeId
            }).populate('treeId')
            if(!replicas) {
                res.status(404).json({message: "Replicas not found"})
            }
            const replicasWithImages = replicas.map(replica => {
                let imageUrl = null;
                if (replica.image && replica.image.data) {
                    const base64Image = replica.image.data.toString('base64');
                    imageUrl = `data:${replica.image.contentType};base64,${base64Image}`;
                }
                return { ...replica._doc, imageUrl };
            });
            res.json(replicasWithImages)
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    },

    addReplica: async (req, res) => {
        try {
            const replica = await Replica.create({
                treeId: req.body.treeId,
                image: req.body.image,
                sample: req.body.sample,
                notes: req.body.notes
            })
            const tree = await Tree.findOne({_id: req.body.treeId})
            if (!tree) {
                return res.status(404).json({message: "Tree not found"});
            }
            if(req.file){
                replica.image = {
                    data: fs.readFileSync(req.file.path),
                    contentType: req.file.mimetype
                };
                await replica.save();
                fs.unlinkSync(req.file.path);
            } else {
                await replica.save();
            }
            tree.replicas.push({ replicaUniqueId: replica.replicaUniqueId })
            await tree.save()
            res.json({"message": "replica inserita", "replica": replica, "id replica" : replica.replicaUniqueId, 'success': true})
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    },

    deleteTree: async (req, res) => {
        try {
            const tree = await Tree.findOneAndDelete({
                _id: req.params.treeId
            })
            if(!tree) {
                res.status(404).json({message: "Tree not found"})
            }
            res.json({message: "Tree deleted", "success": true})
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }


}

