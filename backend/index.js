require('dotenv').config({path: './config.env'})
const express = require('express')
const mongoose = require('mongoose')

// const autoIncrement = require('mongoose-auto-increment')

const userRoute = require('./routers/userRouter');
const treeRoute = require('./routers/treeRouter');
const verifyRoute = require('./routers/verifyRouter');

const User = require('./models/userModel');
const passport = require('passport');
const expressSession = require("express-session");
const ATLAS_URI = process.env.ATLAS_URI || "";
const SECRET_KEY = process.env.SECRET_KEY || "";

// autoIncrement.initialize(db)

const app = express()


app.use(express.json())
// app.use(router)
app.use(express.urlencoded({extended: true})); //Affinchè possa prendere dai form i campi
app.use(expressSession(
    {
        secret: SECRET_KEY,
        resave: false,
        saveUninitialized: true,
    }));  //secret passcode, è usata per segnare il session cookie.
app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api/user', userRoute)
app.use('/api/trees', treeRoute)
app.use('/api/verify', verifyRoute)

mongoose.connect(ATLAS_URI)
const db = mongoose.connection

db.once('open', () => app.listen(3000, () => {
    console.log('DB connesso e app pronta')
}))

