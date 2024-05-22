const mongoose = require('mongoose')
// const autoIncrement = require('mongoose-auto-increment')

const treeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    treeUniqueId: String,
    specieNomeComune: String,
    specieNomeScientifico: String,
    sottospecie: String,
    cultivar: String,
    replicas: [{
        replicaUniqueId: String
    }]
})

// treeSchema.plugin(autoIncrement.plugin, {model: 'Tree', field: 'treeUniqueNumber'});

treeSchema.pre('save', async function(next) {
    if (this.isModified('cultivar')) {
        const familyCode = 'LL';
        const inoculationStatus = 'X';
        const trees = await treeModel.find({})
        this.treeUniqueId = familyCode + String(trees.length).padStart(5, "0") + inoculationStatus;
        console.log(this.treeUniqueId)
    }
    next()
})

const treeModel = mongoose.model('Tree', treeSchema)

module.exports = treeModel