const mongoose = require('mongoose')
const {addAbortSignal} = require("stream");
const Schema = mongoose.Schema;

const generateAnalysisId = function () {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};

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
    protocolId: {
        type: String,
        unique: true
    },
    notes: String,
    documents: [documentSchema],
    image: imageSchema,
    downloaded: Boolean
})

analysisSchema.pre('save', async function(next) {
    if(this.isNew) {
        this.protocolId = generateAnalysisId();
    }
    next();
});
const analysisModel = mongoose.model('Analysis', analysisSchema)

module.exports = analysisModel