const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const config = require('../config/config');
const db = require('../db');
const { User, Rol } = db;
async function checkToken(req, res, next) {
    const token = req.headers["x-access-token"];
    try {
        if (!token) return res.status(400).json({ message: 'no token provided' });
        const tokenData = jwt.verify(token, config.SECRET);
        req.userId = tokenData.id
        const usrExists = await User.findOne({ where: { id: tokenData.id } });
        if (!usrExists) return res.status(400).json({ message: 'user doesnt exist' });
        next();

    } catch (err) {
        return res.status(400).json({ message: 'Denied' });
    }
}

async function checkAdmin(req, res, next) {
    try {
        const user = await  User.findOne({ where: { id: req.userId } })
        if(!user.roles.includes('admin')) return res.status(400).json({message:"No es admin"});
        next()
    } catch (err) {
        res.status(400).json({message:"Denied"})
    }
}

async function checkSuperadmin(req, res, next) {
    try {
        const user = await  User.findOne({ where: { id: req.userId } })
        if(!user.roles.includes('superadmin'))return res.status(400).json({message:"No es superadmin"});
        next()
    } catch (err) {
        res.status(400).json({message:"Denied"})
    }
}


module.exports = {
    checkToken,
    checkAdmin,
    checkSuperadmin
}