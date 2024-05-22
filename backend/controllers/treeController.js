const Tree = require('../models/treeModel')
// const Replica = require('../models/replicaModel')
const User = require('../models/userModel')

const jwt = require('jsonwebtoken')


function getNewReplicaName(myTree) {
    return myTree.treeUniqueId + String(myTree.replicas.length).padStart(3, "0")
}

module.exports = {
    newTree: async (req, res) => {
        // Logica di definizione del nome
        const familyCode = 'LL';
        const inoculationStatus = 'X';
        const trees = await treeModel.find({})

        const local_tree = {
            treeUniqueId: familyCode + String(trees.length).padStart(5, "0") + inoculationStatus,
            cultivar: req.body.cultivar
        }
        local_tree.replicas.push({
            replicaUniqueId: getNewReplicaName(local_tree)
        })

        const tree = await Tree.create(local_tree)
        res.json({"message": "albero inserito", "albero": tree})
    },

    getTrees: async (req, res) => {
        const trees = await Tree.find({
            owner: res.locals.user._id
        })
        console.log(trees)
        res.json(trees)
    },

    login: async (req, res) => {

        console.log(req.body)
        const user = await User.findOne({username: req.body.username})

        console.log(user)

        if (user) {
            const token = jwt.sign({ user }, 'BISCOTTO');
            res.json({ token: token, user: user });
        }
        else {
            res.json({'error': 'utente non trovato'})
        }
    },

    newReplica: async (req, res) => {
        // const replica = await Replica.create({
        //     treeId: req.body.treeId
        // })
        const tree = await Tree.findOne({_id: req.body.treeId})
        tree.replicas.push({
            replicaUniqueId: getNewReplicaName(tree)
        })
        await tree.save()
        res.json({"message": "replica inserita", "tree": tree})
    }

}

