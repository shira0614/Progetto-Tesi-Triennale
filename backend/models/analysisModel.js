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
    shipper: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['shipped', 'completed', 'accepted', 'rejected']
    },
    protocolId: String,
    notes: String,
    documents: [String],
    image: String
})

const analysisModel = mongoose.model('Analysis', analysisSchema)

module.exports = analysisModel