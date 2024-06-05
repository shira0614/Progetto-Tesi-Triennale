const User = require("../models/userModel")
const Replica = require('../models/replicaModel')
const Analysis = require('../models/analysisModel')
const mongoose = require("mongoose");
const fs = require('fs');
const multer = require("multer");
const upload = multer({ dest: './uploads/' });

module.exports = {
    createAnalysis: async (req, res) => {
        try {
            const replica = await Replica.findOne({ _id: req.body.replicaId });
            if(!replica) {
                return res.status(404).json({ message: 'Replica not found' });
            }
            const labUser = await User.findOne({ username: req.body.labUsername });
            if (!labUser) {
                return res.status(404).json({ message: 'Lab not found' });
            }
            await Analysis.create({
                shipper: req.userId,
                laboratory: labUser._id,
                replica: req.body.replicaId,
                status: 'shipped',
                protocolID : req.body.protocolID,
                notes: req.body.notes,
                documents: req.body.document,
                image: req.body.image

            })
            res.json({ 'message': 'analysis created', 'success': true });
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
            analysis.status = req.body.status
            if (req.body.notes) analysis.notes = req.body.notes
            await analysis.save()
            res.json({'message': 'analysis saved', 'analysis': analysis, 'success': true})
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    updateAnalysis: async (req, res) => {
        console.log('Request file:', req.file);
        console.log('Request body:', req.body);
        try {
            if (req.file) {
                const fileBuffer = fs.readFileSync(req.file.path);

                console.log('File buffer:', fileBuffer);

                const analysis = await Analysis.findOne({_id: req.body.analysisId});
                if (!analysis) {
                    return res.status(404).json({ 'message': 'Analysis not found' });
                }

                // Ensure the documents array is initialized
                if (!Array.isArray(analysis.documents)) {
                    analysis.documents = [];
                }
                
                analysis.documents.push({
                    data: fileBuffer,
                    contentType: req.file.mimetype
                });
                analysis.notes = req.body.notes;
                analysis.image = req.body.image;
                analysis.status = 'completed';
                await analysis.save();
                fs.unlinkSync(req.file.path);
                return res.json({ 'message': 'Analysis saved', 'analysis': analysis, 'success': true });
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
                            model: 'Tree'
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
            const user = await User.findOne({ _id: req.userId })
            if (user.role === 'coltivatore') {
                const analyses = await Analysis.find({ shipper: req.userId }).populate([
                    'laboratory',
                    'replica',
                    {
                        path: 'replica',
                        populate: {
                            path: 'treeId',
                            model: 'Tree'
                        }
                    }
                ]);
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
    },

    deleteAnalysis: async (req, res) => {
        try {
            const analysis = await Analysis.findOneAndDelete({ _id: req.params.analysisId });
            if(!analysis) {
                return res.status(404).json({ 'message': 'Analysis not found' });
            } else {
                return res.status(200).json({ 'message': 'Analysis deleted successfully' });
            }
        } catch (err) {
            return res.status(500).json({ 'message': 'An error occurred', 'error' : err.message });
        }
    }
}