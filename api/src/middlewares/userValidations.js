const { User } = require('../db');


async function checkUser(req, res, next) {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) return res.status(400).json({error:"El usuario ya existe"});
    next();
}


module.exports = {
    checkUser
}