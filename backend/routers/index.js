const express = require('express')
const treeRouter = require('./treeRouter')

const router = express.Router()


router.use('/trees', treeRouter)


module.exports = router