const db = require('../db');
const { User, Rol } = db;
const config = require('../config/config')
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

async function signUp(req, res, next) {
    const { email, username, password} = req.body;
    try {
        const newUser = new User({
            email, username, password: await User.prototype.hashPassword(password)
        })
        const savedUser = await newUser.save();
        await savedUser.setRol("user");
        const token = jwt.sign({ id: savedUser.id }, config.SECRET, { expiresIn: 86400 });
        res.status(200).json({token})
    } catch (err) {
        next(err)
    }

}

async function signIn (req,res,next) {
    const {email,password} = req.body
    try{
        const userFound = await User.findOne({where:{email}})
        if(!userFound)return res.status(400).json({ error: "El usuario no existe" });
        const token = jwt.sign({id: userFound.id}, config.SECRET, {expiresIn: 86400});
        const validPassword = await User.prototype.comparePassword(password, userFound.password);
        if (!validPassword) return res.status(400).json({ error: "la contraseña no coincide" });
        res.json({token})
        console.log('llega');

    }catch(err){
        next(err)
    }
}

module.exports = {
    signIn,
    signUp
}