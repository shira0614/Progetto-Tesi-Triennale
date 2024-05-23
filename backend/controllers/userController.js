const jwt = require('jsonwebtoken');
const passport = require('passport');
const SECRET_KEY = process.env.SECRET_KEY || "";
const User = require('../models/userModel');

const createUser = (req, res) => {
    const newUser = new User({username: req.body.username, role: req.body.role});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            res.status(500).json({success: false, error: err});
        } else {
            res.status(200).json({success: true, message: 'Account created successfully'});
        }
    });
};

const authUser = (req, res) => {
    passport.authenticate(
        'local',
        {
            failureRedirect: "/login-failure",
            failureFlash: "Login failed",
            successRedirect: "/",
            successFlash: "Login successful"
        },
        (error, user) => {
            if (error) {
                return res.status(500).json({message: error});
            } else {
                if (!user) {
                    res.status(403).json({success: false, message: "Incorrect username or password"});
                } else {
                    const token = jwt.sign(
                        {
                            data: {
                                userId: user._id,
                                username: user.username
                            },
                            exp: new Date().setDate(new Date().getDate() + 1) // expires in 24h
                        },
                        SECRET_KEY
                    );
                    res.status(201).json({
                        success: true,
                        message: "Login successful",
                        token: token
                    });
                }}
        }
    )(req, res);
}

module.exports = {authUser, createUser};
