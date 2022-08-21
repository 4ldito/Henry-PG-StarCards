const { Router } = require('express');
const logInRoutes = Router();
const config = require('../config/config');
const jwt = require('jsonwebtoken');

const authCtrl = require('../controllers/logIn.controller')
const userVal = require('../middlewares/userValidations');

logInRoutes.post('/signup', userVal.checkUser, authCtrl.signUp);
logInRoutes.post('/signin', authCtrl.signIn);

logInRoutes.get('/:token', async (req, res) => {
    const { token } = req.params;
    const { id } = req.query;

    try {
        const tokenData = jwt.verify(token, config.SECRET);
        return res.send(tokenData.id === id);

    } catch (err) {
        console.error(err);
    }
})

module.exports = logInRoutes