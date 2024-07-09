const express = require('express')
const treeController = require('../controllers/treeController')
const verifyToken = require('../middleware/verifytoken.js')
const {checkColtRole} = require("../middleware/checkRole");
const multer = require('multer');

const upload = multer({ dest: '../controllers/uploads/' });

const router = express.Router()

router.use(verifyToken)
router.use(checkColtRole)

router.post('/addTree', upload.single('image'), treeController.addTree)
router.post('/newReplica', upload.single('image'), treeController.addReplica)
router.get('/:treeId/replicas', treeController.getReplicas)
router.get('/:treeId', treeController.getTree)
router.get('/', treeController.getTrees)


module.exports = router