const mongoose = require('mongoose')

const analysisSchema = new mongoose.Schema({
    partyId: mongoose.Schema.ObjectId,
    replica: mongoose.Schema.ObjectId,
    status: String,
    protocolId: String,
    notes: String,
    documents: [String]
})

const analysisModel = mongoose.model('Analysis', analysisSchema)

module.exports = analysisModel