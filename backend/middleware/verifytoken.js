const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const SECRET_KEY = process.env.SECRET_KEY || "";

const verifyToken = (req, res, next)=> {
    const token = req.headers['Authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        } else {
            User.findById(decoded.data.userId).then(user => {
                if(user) {
                    req.userId = decoded.data.userId;
                    next();
                } else {
                    return res.status(404).json({ message: 'User not found' });
                }
            })
        }
    });
}

module.exports = verifyToken;