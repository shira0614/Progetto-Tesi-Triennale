const Tree = require('../models/treeModel')
const Replica = require('../models/replicaModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


function getNewReplicaName(myTree) {
    return myTree.treeUniqueId + String(myTree.replicas.length).padStart(3, "0")
}

module.exports = {
    addTree: async (req, res) => {
        // Logica di definizione del nome
       // const familyCode = 'LL';
       // const inoculationStatus = 'X';
        const trees = await treeModel.find({})

        const local_tree = {
          //  treeUniqueId: familyCode + String(trees.length).padStart(5, "0") + inoculationStatus,
            cultivar: req.body.cultivar,
            owner: req.userId,
            specieNomeComune: req.body.specieNomeComune,
            specieNomeScientifico: req.body.specieNomeScientifico,
            sottospecie: req.body.sottospecie,
            inoculated: req.body.inoculated,
            infectionType: req.body.infectionType,
            dateOfBirth: req.body.dateOfBirth,
            notes: req.body.notes
        }
        
        // local_tree.replicas.push({
        //    replicaUniqueId: getNewReplicaName(local_tree)
        // })

        try {
            const tree = await Tree.create(local_tree)
            res.json({"message": "Tree inserted", "tree": tree})
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    },

    getTrees: async (req, res) => {
        try {
            const trees = await Tree.find({
                owner: res.locals.user._id
            })
            if(!trees) {
                res.status(404).json({message: "Trees not found"})
            }
            console.log(trees)
            res.json(trees)
        } catch (err) {
            res.status(500).json({message: err.message})
        }
        
    },

    // vedere bene questa POST

    newReplica: async (req, res) => {
        const replica = await Replica.create({
             treeId: req.body.treeId
         })
        const tree = await Tree.findOne({_id: req.body.treeId})
        tree.replicas.push({
            replicaUniqueId: getNewReplicaName(tree)
        })
        await tree.save()
        res.json({"message": "replica inserita", "tree": tree})
    }

    //TODO Metodo per inviare le repliche al laboratorio

}

