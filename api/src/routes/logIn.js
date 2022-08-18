const { Router } = require('express')
const logInRoutes = Router()

const authCtrl = require('../controllers/logIn.controller')



logInRoutes.post('/signup',authCtrl.signUp);
logInRoutes.post('/signin',authCtrl.signIn);


module.exports = logInRoutes