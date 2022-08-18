const db = require('../db');
const { User, Rol } = db;
const config = require('../config/config')
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

async function signUp(req, res, next) {
    const { email, username, password, roles } = req.body;
    try {
        const newUser = new User({
            email, username, password: await User.prototype.hashPassword(password)
        })
        if (roles) {
            const rolesfound = await Rol.findAll({ where: { id: { [Op.in]: roles } } });
            newUser.roles = rolesfound.map(e=>e.id);
        }else{
            newUser.roles = ["user"];
        }
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser.id }, config.SECRET, { expiresIn: 86400 });
        res.status(200).json({token})
    } catch (err) {
        next(err)

    }

}

async function signIn (req, res,next) {
    const {email} = req.body
    try{
        const userFound = await User.findOne({where:{email}},{include: [{model:Rol}]})
        if(!userFound)return res.status(400).json({token:null,message:'el usuario no existe'});
        const validPassword = await User.prototype.comparePassword(req.body.password, userFound.password);
        console.log(validPassword);
        if(!validPassword)return res.status(400).json({token:null, message:"la contraseña no coincide"});
        const token = jwt.sign({id: userFound.id}, config.SECRET, {expiresIn: 86400});
        res.json({token})

    }catch(err){
        next(err)
    }
}

module.exports = {
    signIn,
    signUp
}