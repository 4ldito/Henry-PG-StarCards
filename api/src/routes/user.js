const { Router } = require("express");
const User = require("../models/user");
// const { Country, Activity, cache } = require('../db');

// const axios = require('axios');
// const API_ALL_URL = 'https://restcountries.com/v3/all';

const userRoute = Router();

///////////////////////Routes Profile//////////////////////////////////////////

userRoute.patch("/changeprofile:username", async(req, res, next) => {
try {
const usernameNew = req.body
    await User.update(User, {
        where: {
            username : usernameNew 
        }
    })
    res.json('Username Updated!')

} catch (error) {
      next(err)
}});

userRoute.patch("/changeprofile:email", async(req, res, next) => {
try {
const emailNew = req.body
    await User.update(User, {
        where: {
            email : emailNew 
        }
    })
    res.json('Email Updated!')

} catch (error) {
      next(err)
}});

userRoute.patch("/changeprofile:password", async(req, res, next) => {
try {
const passwordNew = req.body
    await User.update(User, {
        where: {
            password : passwordNew 
        }
    })
    res.json('Password Updated!')

} catch (error) {
      next(err)
}});

userRoute.patch("/changeprofile:profileImg", async(req, res, next) => {
try {
const profileImgNew = req.body
    await User.update(User, {
        where: {
            profileImg : profileImgNew 
        }
    })
    res.json('Profile Image Updated!')

} catch (error) {
      next(err)
}});

userRoute.patch("/changeprofile:coverImg", async(req, res, next) => {
try {
const coverImgNew = req.body
    await User.update(User, {
        where: {
            coverImg : coverImgNew 
        }
    })
    res.json('Cover Image Updated!')

} catch (error) {
      next(err)
}});

module.exports = userRoute;
