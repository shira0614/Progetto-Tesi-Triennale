const roleChecking = async (req, res) => {
    res.status(200).json({role: req.user.role});
};

module.exports = roleChecking;