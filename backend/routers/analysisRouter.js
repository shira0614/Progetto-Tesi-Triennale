const express = require('express')
const analysisController = require('../controllers/analysisController.js')
const verifyToken = require('../middleware/verifytoken.js')
const {checkColtRole, checkLabRole} = require("../middleware/checkRole");

const router = express.Router()

router.use(verifyToken)

router.post('/addAnalysis', checkColtRole , analysisController.createAnalysis)
router.post('/acceptAnalysis', checkLabRole , analysisController.acceptAnalysis) 
router.post('/updateAnalysis', checkLabRole , analysisController.updateAnalysis) //da rivedere
router.get('/labAnalyses', checkLabRole, analysisController.getLabAnalyses)
router.delete('/deleteAnalysis/:analysisId', checkLabRole, analysisController.deleteAnalysis)
router.get('/', checkColtRole, analysisController.getAnalyses)

module.exports = router