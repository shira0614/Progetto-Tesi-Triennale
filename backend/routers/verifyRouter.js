const express = require('express')
const router = express.Router();
const verify = require('../controllers/verifyController.js')
const verifyToken = require('../middleware/verifytoken.js')

router.use(verifyToken);

router.get("/",verify);

module.exports = router;
