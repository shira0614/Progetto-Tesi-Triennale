const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String
});

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
    timestamp: Date,
    notes: String,
    image: imageSchema,
    lastReplicaId: Number,
    lastCultivarId: Number
})

const cultivar = Object.freeze({
    Leccino: 'LE',
    Frantoio: 'FR',
    Moraiolo: 'MO'
})

treeSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('cultivar')) {
        const familyCode = cultivar[this.cultivar]
        const inoculationStatus = this.inoculated ? 'I' : 'N';
        const lastTree = await mongoose.model('Tree').find({ cultivar: this.cultivar })
        this.lastCultivarId = lastTree.length > 0 ? lastTree[lastTree.length - 1].lastCultivarId + 1 : 0
        this.treeUniqueId = familyCode + String(this.lastCultivarId).padStart(5, "0") + inoculationStatus;
        console.log(this.treeUniqueId)
    }
    next()
})

const treeModel = mongoose.model('Tree', treeSchema)

module.exports = treeModel