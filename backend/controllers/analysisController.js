const User = require("../models/userModel")
const Replica = require('../models/replicaModel')
const Analysis = require('../models/analysisModel')
const mongoose = require("mongoose");


module.exports = {
    createAnalysis: async (req, res) => {
        try {
            const replica = await Replica.findOne({ _id: req.body.replicaId });
            if(!replica) {
                return res.status(404).json({ message: 'Replica not found' });
            }
            await Analysis.create({
                shipper: req.userId,
                laboratory: req.body.laboratoryId,
                replica: req.body.replicaId,
                status: 'shipped',
                protocolID : req.body.protocolID,
                notes: req.body.notes,
                documents: [req.body.document],
                image: req.body.image

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

    //sending files over http?
    updateAnalysis: async (req, res) => {
        try {
            if (req.body.document) {
                const analysis = await Analysis.findOne({_id: req.body.analysisId});
                if (!analysis) {
                    return res.status(404).json({ 'message': 'Analysis not found' });
                }
                analysis.documents.push(req.body.document);
                analysis.status = 'completed';
                await analysis.save();
                return res.json({ 'message': 'Analysis saved', 'analysis': analysis });
            }
            return res.status(400).json({ 'message': 'No document provided' });
        } catch (err) {
            return res.status(500).json({ 'message': 'An error occurred', 'error': err.message });
        }
    },

    getLabAnalyses: async (req, res) => {
        try {
                const analyses = await Analysis.find({ laboratory: req.userId }).populate([
                    'shipper',
                    'replica',
                    {
                        path: 'replica',
                        populate: {
                            path: 'treeId',
                            model: 'Tree' // replace 'Tree' with your Tree model name
                        }
                    }
                ]);
                if(!analyses) {
                    return res.status(404).json({ 'message': 'No analyses found' });
                } else {
                    return res.json(analyses);
                }
        } catch (err) {
            return res.status(500).json({ 'message': 'An error occurred', 'error' : err.message });
        }
    },

    getAnalyses: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.userId });
            if (user.role === 'coltivatore') {
                const analyses = await Analysis.find({ shipper: req.userId });
                if(!analyses) {
                    return res.status(404).json({ 'message': 'No analyses found' });
                } else {
                    return res.json({ 'analyses': analyses });
                }
            } else {
                return res.status(403).json({ 'message': 'Unauthorized' });
            }
        } catch (err) {
            return res.status(500).json({ 'message': 'An error occurred', 'error' : err.message });
        }
    }
}