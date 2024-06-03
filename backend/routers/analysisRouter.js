const express = require('express')
const analysisController = require('../controllers/analysisController.js')
const verifyToken = require('../middleware/verifytoken.js')
const {checkColtRole, checkLabRole} = require("../middleware/checkRole");
const multer = require('multer');

const upload = multer({ dest: '../controllers/uploads/' });

const router = express.Router()

router.use(verifyToken)

router.post('/newAnalysis', checkColtRole , analysisController.createAnalysis)
router.post('/acceptAnalysis', checkLabRole , analysisController.acceptAnalysis) 
router.post('/updateAnalysis', checkLabRole , analysisController.updateAnalysis) //da rivedere
router.get('/labAnalyses', checkLabRole, analysisController.getLabAnalyses)
router.post('/addDocument/:analysisId', upload.single('document'), analysisController.addDocument); //da rivedere
router.delete('/deleteAnalysis/:analysisId', checkLabRole, analysisController.deleteAnalysis)
router.get('/', checkColtRole, analysisController.getAnalyses)

module.exports = router