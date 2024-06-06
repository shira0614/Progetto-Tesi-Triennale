const mongoose = require('mongoose')
const Tree = require('./treeModel')

const imageSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String
});

const replicaSchema = new mongoose.Schema({
    treeId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tree'
    },
    replicaUniqueId: String,
    image: imageSchema,
    sample: String,
    notes: String
})

replicaSchema.pre("save", async function(next) {
    if (this.isNew || this.isModified('treeId')) {
        const myTree = await Tree.findOne({_id: this.treeId})
        this.replicaUniqueId = myTree.treeUniqueId + String(myTree.lastReplicaId).padStart(3, "0");
        myTree.lastReplicaId = myTree.lastReplicaId + 1
        await myTree.save()
    }
    next();
})

const replicaModel = mongoose.model('Replica', replicaSchema)
module.exports = replicaModel
