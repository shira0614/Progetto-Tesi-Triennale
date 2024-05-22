const express = require('express')
const mongoose = require('mongoose')
// const autoIncrement = require('mongoose-auto-increment')

const router = require('./routers/index')

mongoose.connect('mongodb+srv://sciueferrara:Ciaoatutti.123!@cluster0.d9fbxpj.mongodb.net/Omibreed?retryWrites=true&w=majority&appName=Cluster0')
const db = mongoose.connection

// autoIncrement.initialize(db)

const app = express()


app.use(express.json())
app.use(router)


db.once('open', () => app.listen(5002, () => {
    console.log('DB connesso e app pronta')
}))

