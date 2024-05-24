const  express = require('express')
const router = express.Router()
const {authUser, createUser} = require('../controllers/userController.js')
const {checkSuperRole} = require("../middleware/checkRole");

router.post('/login', authUser);
router.post("/signup", checkSuperRole , createUser);
module.exports = router;