const express = require('express')
const treeController = require('../controllers/treeController')
const verifyToken = require('../middleware/verifytoken.js')
const {checkColtRole} = require("../middleware/checkRole");


const router = express.Router()

router.use(verifyToken)
router.use(checkColtRole)

router.post('/addTree', treeController.addTree)
router.post('/newReplica', treeController.newReplica)
router.post('/:treeId/replicas', treeController.getReplicas)
router.get('/:treeId', treeController.getTree)
router.get('/', treeController.getTrees)


module.exports = router