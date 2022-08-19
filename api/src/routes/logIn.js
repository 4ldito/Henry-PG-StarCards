const { Router } = require('express')
const logInRoutes = Router()

const authCtrl = require('../controllers/logIn.controller')
const userVal = require('../middlewares/userValidations');

logInRoutes.post('/signup', userVal.checkUser,authCtrl.signUp);
logInRoutes.post('/signin', authCtrl.signIn);

module.exports = logInRoutes