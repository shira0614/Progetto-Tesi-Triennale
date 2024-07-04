const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const SECRET_KEY = process.env.SECRET_KEY || "";

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log("Failed to authenticate token", err);
            return res.status(403).json({ message: 'Failed to authenticate token' });
        } else {
            User.findById(decoded.data.userId).then(user => {
                if (user) {
                    req.userId = decoded.data.userId;
                    next();
                } else {
                    console.log("User not found");
                    return res.status(404).json({ message: 'User not found' });
                }
            }).catch(error => {
                console.log("Error fetching user", error);
                return res.status(500).json({ message: 'Error fetching user' });
            });
        }
    });
}


module.exports = verifyToken;