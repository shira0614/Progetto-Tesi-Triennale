const Replica = require('../models/replicaModel')
const Analysis = require('../models/analysisModel')
const mongoose = require("mongoose");

module.exports = {
    createAnalysis: async (req, res) => {
        // Gestire autorizzazione coltivatore
        await Analysis.create({
            partyId: req.body.partyId,
            replica: req.body.replicaId,
            status: 'shipped'
        })
        res.json({'message': 'analysis created'})
    },

    acceptAnalysis: async (req, res) => {
        // Gestire autorizzazione azienda
        const analysis = await Analysis.findOne({_id: req.body.analysisId})
        analysis.status = req.body.newStatus
        if (req.body.notes) analysis.notes = req.body.notes
        await analysis.save()
        res.json({'message': 'analisi salvata', 'analisi': analysis})
    },

    updateAnalysis: async (req, res) => {
        // Gestire autorizzazione azienda
        if (req.body.document) {
            const analysis = await Analysis.findOne({_id: req.body.analysisId})
            analysis.documents.push(req.body.document)
            analysis.save()
            res.json({'message': 'analisi salvata', 'analisi': analysis})
        }
        res.json({'message': 'errore'})
    }
}