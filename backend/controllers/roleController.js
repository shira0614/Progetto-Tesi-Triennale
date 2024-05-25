const roleChecking = async (req, res) => {
    res.status(200).json({error: "false", message: "Role checking is working fine", role: req.user.role});
};

module.exports = roleChecking;