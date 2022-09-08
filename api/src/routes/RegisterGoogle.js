
const { Router } = require("express");
const userRoute = Router();
const db = require("../db");
const { User } = db;
const jwt = require("jsonwebtoken");
const config = require("../config/config");

userRoute.post("/", async (req, res, next) => {
    const { email, username, profileImg, loginGoogle } = req.body;
    const password = 'starcards2022'

    try {
        let user = await User.findOne({ where: { email } });
        if(!user){
            user = await User.findOrCreate({
                    where: { password: await User.prototype.hashPassword(password),
                        username,
                        email,
                        loginGoogle,
                        profileImg
                        }
            })
            await user[0].setRol("user");
            await user[0].setStatus("active");
             const token = jwt.sign(
                { id: user[0].id, rol: user[0].RolId },
                config.SECRET,
                { expiresIn: 86400 }
              );
              res.status(200).json({ token, rol: user[0].RolId, id: user[0].id, user: user[0] });
        }else{
            const token = jwt.sign(
                { id: user.id, rol: user.RolId },
                config.SECRET,
                { expiresIn: 86400 }
              );
        res.status(200).json({ token, rol: user.RolId, id: user.id, user: user })
        }
        } catch (error) {
            next(error)
        }
});




module.exports = userRoute;
