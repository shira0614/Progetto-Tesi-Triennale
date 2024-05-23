const mongoose = require('mongoose')

const treeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    treeUniqueId: String,
    specieNomeComune: String,
    specieNomeScientifico: String,
    sottospecie: String,
    cultivar: {
        type: String,
        enum: ['Leccino', 'Frantoio', 'Moraiolo'],
    },
    replicas: [{
        replicaUniqueId: String
    }],
    inoculated: Boolean,
    infectionType: String,
    dateOfBirth: Date,
    notes: String
})

const cultivar = Object.freeze({
    Leccino: 'LE',
    Frantoio: 'FR',
    Moraiolo: 'MO'
})

const treeModel = mongoose.model('Tree', treeSchema)

module.exports = treeModel

treeSchema.pre('save', async function(next) {
    if (this.isModified('cultivar')) {
        const familyCode = cultivar[this.cultivar]
        const inoculationStatus = this.inoculated ? 'I' : 'N';
        const trees = await treeModel.find({})
        this.treeUniqueId = familyCode + String(trees.length).padStart(5, "0") + inoculationStatus;
        console.log(this.treeUniqueId)
    }
    next()
})