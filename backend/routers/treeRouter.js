const express = require('express')
const treeController = require('../controllers/treeController')
const verifyToken = require('../middleware/verifytoken.js')

const router = express.Router()

router.use(verifyToken)

router.post('/addTree', treeController.addTree)
router.post('/newReplica', treeController.newReplica)
router.post('/replicas', treeController.getReplicas)
router.get('/', treeController.getTrees)

module.exports = router