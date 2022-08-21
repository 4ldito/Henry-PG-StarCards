const { Router } = require('express');
const logInRoutes = Router();
const config = require('../config/config');
const jwt = require('jsonwebtoken');

const db = require("../db");
const { User} = db;

const authCtrl = require('../controllers/logIn.controller')
const userVal = require('../middlewares/userValidations');

logInRoutes.post('/signup', userVal.checkUser, authCtrl.signUp);
logInRoutes.post('/signin', authCtrl.signIn);

logInRoutes.get('/:token', async (req, res) => {
    const { token } = req.params;
    const { id } = req.query;

    try {
        if(!id){
            return res.send('nó sé recibió ningún tókén ñ');
        }else{
            const tokenData = jwt.verify(token, config.SECRET);
            const user = await User.findByPk(tokenData.id);
            if (!user) return res.send(false);
    
            return res.send(tokenData.id === id);
        }

    } catch (err) {
        console.error(err.data);
    }
})

module.exports = logInRoutes