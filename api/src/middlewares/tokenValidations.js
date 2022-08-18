const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require('../db');
const {User} = db;
async function checkToken(req, res, next){
    const token = req.headers["x-access-token"];
    if(!token) return res.status(400).json({message: 'no token provided'});
    const tokenData = jwt.verify(token, config.SECRET);
    req.userId = tokenData.id
    const usrExists = await User.findOne({where:{id:tokenData.id}});
    if(!usrExists) return res.status(400).json({message: 'user doesnt exist'});
    next();
}

module.exports = {
    checkToken
}