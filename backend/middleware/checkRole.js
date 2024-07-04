const User = require('../models/userModel');

const checkColtRole = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.role !== 'coltivatore') {
            return res.status(403).json({ message: 'Unauthorized user' });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const checkLabRole = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.role !== 'laboratorio') {
            return res.status(403).json({ message: 'Unauthorized user' });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const checkSuperRole = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.role !== 'superuser') {
            return res.status(403).json({ message: 'Unauthorized user' });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {checkColtRole, checkLabRole, checkSuperRole}