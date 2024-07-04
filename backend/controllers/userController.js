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
                    const expirationTime = Math.floor(Date.now() / 1000) + (24 * 60 * 60); // Current time in seconds + 86400 seconds (24h)
                    const token = jwt.sign(
                        {
                            data: {
                                userId: user._id,
                                username: user.username
                            },
                            exp: expirationTime
                        },
                        SECRET_KEY
                    );

                    // Send the token in a cookie
                    res.cookie('token', token, {
                        httpOnly: true, // The cookie is not accessible via JavaScript
                        secure: process.env.NODE_ENV === 'production', // In production, set secure to true to send over HTTPS
                        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // Adjust sameSite for dev and prod
                        maxAge: 24 * 60 * 60 * 1000 // 24 hours
                    });

                    res.status(201).json({
                        success: true,
                        message: "Login successful",
                        username: user.username,
                        role: user.role
                    });
                }}
        }
    )(req, res);
}

module.exports = {authUser, createUser};
