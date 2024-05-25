const express = require('express')
const router = express.Router();
const {checkRole} = require("../middleware/checkRole");
const roleChecking = require("../controllers/roleController.js");

router.use(checkRole);

router.get("/", roleChecking);

module.exports = router;