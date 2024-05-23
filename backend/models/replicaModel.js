const mongoose = require('mongoose')
const Tree = require('./treeModel')

const replicaSchema = new mongoose.Schema({
    treeId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tree'
    },
})

const replicaModel = mongoose.model('Replica', replicaSchema)

module.exports = replicaModel

replicaSchema.pre("save", async function(next) {
    const otherReplicas = await replicaModel.find({treeId: this.treeId})
    if (this.isModified('treeId')) {
        const myTree = await Tree.findOne({_id: this.treeId})
        this.replicaUniqueId = myTree.treeUniqueId + String(myTree.replicas.length).padStart(3, "0");
    }
    next()
})
