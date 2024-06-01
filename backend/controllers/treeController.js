const Tree = require('../models/treeModel')
const Replica = require('../models/replicaModel')

module.exports = {
    addTree: async (req, res) => {

        const local_tree = {
            cultivar: req.body.cultivar,
            owner: req.userId,
            specieNomeComune: req.body.specieNomeComune,
            specieNomeScientifico: req.body.specieNomeScientifico,
            sottospecie: req.body.sottospecie,
            inoculated: req.body.inoculated,
            infectionType: req.body.infectionType,
            timestamp: req.body.timestamp ? req.body.timestamp : new Date(),
            notes: req.body.notes
        }

        try {
            const tree = await Tree.create(local_tree)
            await tree.save()
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

            console.log(trees)
            res.json(trees)
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
            res.json(tree)
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
            res.json(replicas)
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    },

    newReplica: async (req, res) => {
        try {
            const replica = await Replica.create({
                treeId: req.body.treeId
            })
            const tree = await Tree.findOne({_id: req.body.treeId})
            if (!tree) {
                return res.status(404).json({message: "Tree not found"});
            }
            await replica.save()
            tree.replicas.push({ replicaUniqueId: replica.replicaUniqueId })
            await tree.save()
            res.json({"message": "replica inserita", "tree": tree, "id replica" : replica.replicaUniqueId})
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }


}

