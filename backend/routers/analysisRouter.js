const express = require('express')
const analysisController = require('../controllers/analysisController.js')
const verifyToken = require('../middleware/verifytoken.js')
const {checkColtRole, checkLabRole} = require("../middleware/checkRole");

const router = express.Router()

router.use(verifyToken)

router.post('/addAnalysis', checkColtRole , analysisController.createAnalysis)
router.post('/acceptAnalysis', checkLabRole , analysisController.acceptAnalysis) //da rivedere ?
router.post('/updateAnalysis', checkLabRole , analysisController.updateAnalysis)

module.exports = router