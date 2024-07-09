const User = require("../models/userModel")
const Replica = require('../models/replicaModel')
const Analysis = require('../models/analysisModel')
const mongoose = require("mongoose");
const fs = require('fs');
const { Readable } = require('stream');
const multer = require("multer");
const JSZip = require("jszip");
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
            const local_analysis = {
                shipper: req.userId,
                laboratory: labUser._id,
                replica: req.body.replicaId,
                status: 'shipped',
                notes: req.body.notes,
                documents: [],
                downloaded: false
            }
            const analysis = await Analysis.create(local_analysis);
            if(req.files['document'] && req.files['document'][0]) {
                const documentFile = req.files['document'][0];
                const documentBuffer = fs.readFileSync(documentFile.path);

                analysis.documents.push({
                    data: documentBuffer,
                    contentType: documentFile.mimetype
                });

                await analysis.save();
                fs.unlinkSync(documentFile.path);
            }
            if (req.files['image'] && req.files['image'][0]) {
                const imageFile = req.files['image'][0];
                const imageBuffer = fs.readFileSync(imageFile.path);
                analysis.image = {
                    data: imageBuffer,
                    contentType: imageFile.mimetype
                };
                await analysis.save();
                fs.unlinkSync(imageFile.path);
            } else {
                await analysis.save();
            }
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
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);
        try {
            if (req.files['document'] && req.files['document'][0] && req.files['document'][0].path) {
                const documentFile = req.files['document'][0];
                const documentBuffer = fs.readFileSync(documentFile.path);

                const analysis = await Analysis.findOne({_id: req.body.analysisId});
                if (!analysis) {
                    return res.status(404).json({ 'message': 'Analysis not found' });
                }

                // Ensure the documents array is initialized
                if (!Array.isArray(analysis.documents)) {
                    analysis.documents = [];
                }

                analysis.documents.push({
                    data: documentBuffer,
                    contentType: documentFile.mimetype
                });

                if(req.files['image'] && req.files['image'][0]) {
                    const imageFile = req.files['image'][0];
                    analysis.image = {
                        data: fs.readFileSync(imageFile.path),
                        contentType: imageFile.mimetype
                    }
                    await analysis.save();
                    fs.unlinkSync(imageFile.path);
                }

                analysis.notes = req.body.notes;
                analysis.status = 'completed';
                await analysis.save();
                fs.unlinkSync(documentFile.path);
                return res.json({ 'message': 'Analysis saved', 'analysis': analysis, 'success': true });
            }
            return res.status(400).json({ 'message': 'No document or image provided' });
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
                    const analysesWithImages = analyses.map(analysis => {
                        let imageUrl = null;
                        if (analysis.image && analysis.image.data) {
                            const base64Image = analysis.image.data.toString('base64');
                            imageUrl = `data:${analysis.image.contentType};base64,${base64Image}`;
                        }
                        return { ...analysis._doc, imageUrl };
                    });
                    return res.json(analysesWithImages);
                }
        } catch (err) {
            return res.status(500).json({ 'message': 'An error occurred', 'error' : err.message });
        }
    },

    getColtAnalyses: async (req, res) => {
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
                    const analysesWithImages = analyses.map(analysis => {
                        let imageUrl = null;
                        if (analysis.image && analysis.image.data) {
                            const base64Image = analysis.image.data.toString('base64');
                            imageUrl = `data:${analysis.image.contentType};base64,${base64Image}`;
                        }
                        return { ...analysis._doc, imageUrl };
                    });
                    return res.json(analysesWithImages);
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
    },

    downloadAnalysis: async (req, res) => {
        try {
            const analysis = await Analysis.findById(req.params.id);
            if (!analysis) {
                return res.status(404).json({ message: 'Analysis not found' });
            }

            const zip = new JSZip();
            analysis.documents.forEach((doc, index) => {
                if (doc && doc.contentType) {
                    let extension;
                    switch (doc.contentType) {
                        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                            extension = 'docx'; // Handle .docx files
                            break;
                        case 'application/vnd.ms-excel':
                            extension = 'xls'; // Correctly set extension for .xls files
                            break;
                        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                            extension = 'xlsx'; // Handle .xlsx files
                            break;
                        case 'application/xml':
                            extension = 'xml'; // Handle .xml files
                            break;
                        default:
                            extension = doc.contentType.split('/')[1]; // Default handling for other types
                            break;
                    }
                    zip.file(`document${index + 1}.${extension}`, doc.data, {binary: true});
                }
            });

            zip.file('notes.txt', analysis.notes || 'Non sono presenti note');

            if (analysis.image && analysis.image.data) {
                zip.file(`image.${analysis.image.contentType.split('/')[1]}`, analysis.image.data);
            }

            const downloadId = analysis.protocolId ? analysis.protocolId : analysis._id;
            zip.generateAsync({ type: 'nodebuffer' }).then((content) => {
                res.set('Content-Disposition', `attachment; filename=analysis_${downloadId}.zip`);
                res.set('Content-Type', 'application/zip');
                res.send(content);
            });

            const user = await User.findOne({ _id: req.userId })
            if (user.role === 'coltivatore') {
                analysis.downloaded = true;
                await analysis.save();
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    }
}
