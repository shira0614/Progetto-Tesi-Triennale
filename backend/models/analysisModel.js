const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    data: Buffer,
    contentType: String
});

const imageSchema = new Schema({
    data: Buffer,
    contentType: String
});


const analysisSchema = new Schema({
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
    documents: [documentSchema],
    image: imageSchema
})

const analysisModel = mongoose.model('Analysis', analysisSchema)

module.exports = analysisModel