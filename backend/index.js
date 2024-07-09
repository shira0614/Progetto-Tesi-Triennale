require('dotenv').config({path: './config.env'})
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')

const userRoute = require('./routers/userRouter');
const treeRoute = require('./routers/treeRouter');
const analysisRoute = require('./routers/analysisRouter');

const User = require('./models/userModel');
const passport = require('passport');
const expressSession = require("express-session");
const ATLAS_URI = process.env.ATLAS_URI || "";
const SECRET_KEY = process.env.SECRET_KEY || "";


const app = express()

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
        methods: 'GET, POST, PUT, DELETE, OPTIONS',
    }
));
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use(passport.initialize())
passport.use(User.createStrategy());


app.use('/api/user', userRoute)
app.use('/api/trees', treeRoute)
app.use('/api/analysis', analysisRoute)


mongoose.connect(ATLAS_URI) 
const db = mongoose.connection

db.once('open', () => app.listen(3000, () => {
    console.log('DB connesso e app pronta')
}))

