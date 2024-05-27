const mongoose = require('mongoose')
const Tree = require('./treeModel')

const replicaSchema = new mongoose.Schema({
    treeId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tree'
    },
    replicaUniqueId: String,
    image: String
})

replicaSchema.pre("save", async function(next) {
    if (this.isNew || this.isModified('treeId')) {
        const myTree = await Tree.findOne({_id: this.treeId})
        const otherReplicas = await mongoose.model('Replica').find({treeId: this.treeId})
        this.replicaUniqueId = myTree.treeUniqueId + String(otherReplicas.length + 1).padStart(3, "0");
    }
    next()
})

const replicaModel = mongoose.model('Replica', replicaSchema)
module.exports = replicaModel
