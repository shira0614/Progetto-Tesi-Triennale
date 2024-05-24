const mongoose = require('mongoose')

const analysisSchema = new mongoose.Schema({
    laboratory: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    replica: {
        type: mongoose.Schema.ObjectId,
        ref: 'Replica'
    },
    status: String,
    protocolId: String,
    notes: String,
    documents: [String]
})

const analysisModel = mongoose.model('Analysis', analysisSchema)

module.exports = analysisModel