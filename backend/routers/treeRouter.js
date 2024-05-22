const express = require('express')
const treeController = require('../controllers/treeController')
const verifyToken = require('../controllers/authentication')

const treeRouter = express.Router()

treeRouter.post('/newTree', treeController.newTree)
treeRouter.post('/newReplica', treeController.newReplica)
treeRouter.post('/login', treeController.login)
treeRouter.get('/all', verifyToken, treeController.getTrees)

module.exports = treeRouter