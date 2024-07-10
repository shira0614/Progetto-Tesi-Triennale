const express = require('express')
const analysisController = require('../controllers/analysisController.js')
const verifyToken = require('../middleware/verifytoken.js')
const {checkColtRole, checkLabRole} = require("../middleware/checkRole");
const multer = require('multer');

const upload = multer({ dest: '../controllers/uploads/' });

const router = express.Router()

router.use(verifyToken)

router.post('/newAnalysis', upload.fields([{ name: 'document', maxCount: 1 }, { name: 'image', maxCount: 1 }]), checkColtRole , analysisController.createAnalysis)
router.post('/acceptAnalysis', checkLabRole , analysisController.acceptAnalysis)
router.post('/updateAnalysis', upload.fields([{ name: 'document', maxCount: 1 }, { name: 'image', maxCount: 1 }]), checkLabRole, analysisController.updateAnalysis);
router.get('/labAnalyses', checkLabRole, analysisController.getLabAnalyses)
router.delete('/deleteAnalysis/:analysisId', checkLabRole, analysisController.deleteAnalysis)
router.get('/', checkColtRole, analysisController.getColtAnalyses)
router.get('/download/:id', analysisController.downloadAnalysis)

module.exports = router