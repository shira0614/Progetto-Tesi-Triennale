const express = require('express')
const router = express.Router()
const { authUser, createUser, userInfo, logoutUser } = require('../controllers/userController.js')
const { checkSuperRole } = require("../middleware/checkRole");
const verifyToken = require('../middleware/verifytoken.js');

router.post('/login', authUser);
router.post('/logout', verifyToken, logoutUser);
router.post('/signup', checkSuperRole, createUser);
router.get('/info', verifyToken, userInfo);

module.exports = router;