const  express = require('express')
const router = express.Router()
const {authUser, createUser} = require('../controllers/userController.js')

router.post('/login', authUser);
router.post("/signup", createUser);
module.exports = router;