const express = require('express')
const treeController = require('../controllers/treeController')
const verifyToken = require('../middleware/verifytoken.js')

const router = express.Router()

router.use(verifyToken)

router.post('/newTree', treeController.addTree)
router.post('/newReplica', treeController.newReplica)
router.get('/all', treeController.getTrees)

module.exports = router