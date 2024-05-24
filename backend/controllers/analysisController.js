const Replica = require('../models/replicaModel')
const Analysis = require('../models/analysisModel')
const mongoose = require("mongoose");
const User = require("../models/userModel");

module.exports = {
    createAnalysis: async (req, res) => {
        try {
            const replica = await Replica.findOne({ _id: req.body.replicaId })
            if(!replica) {
                return res.status(404).json({ message: 'Replica not found' });
            }
            await Analysis.create({
                laboratory: req.userId,
                replica: req.body.replicaId,
                status: 'shipped',
                protocolID : req.body.protocolID,
                notes: req.body.notes,
                documents: [req.body.document]
            })

            res.json({ 'message': 'analysis created' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    acceptAnalysis: async (req, res) => {
        try {
            const analysis = await Analysis.findOne({_id: req.body.analysisId})
            if (!analysis) {
                return res.status(404).json({ message: 'Analysis not found' });
            }
            analysis.status = 'accepted'
            if (req.body.notes) analysis.notes = req.body.notes
            await analysis.save()
            res.json({'message': 'analysis saved', 'analysis': analysis})
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    updateAnalysis: async (req, res) => {
        // Gestire autorizzazione azienda
        if (req.body.document) {
            const analysis = await Analysis.findOne({_id: req.body.analysisId})
            analysis.documents.push(req.body.document)
            analysis.status = 'completed'
            analysis.save()
            res.json({'message': 'analisi salvata', 'analisi': analysis})
        }
        res.json({'message': 'errore'})
    }

    //TODO GET ANALYSIS
}