const db = require("../db");
const { User, Rol, UserCards } = db;
const { tokenValidations } = require("../middlewares");

const { Router } = require("express");
const userRoute = Router();
/// /////////////////////////////////////////////////////////////////////////////////////////////
userRoute.get("/", async (req, res, next) => {
  try {
    const { id } = req.query;
    if (id) {
      const user = await User.findByPk(id, { include: UserCards, attributes: { exclude: ['password'] } })
      if (user) return res.json(user);
      return res.status(404).json({ error: 'error, User Not Found' })
    }
    else {
      const users = await User.findAll({ include: UserCards })
      if (users) return res.json(users)
      return res.json(new Error('error'))
    }
  } catch (error) {
    next(error)
  }
})

userRoute.delete('/', async (req, res, next) => {
  try {
    const id = req.query.id

    if (!id) return res.send({ err: 'error' })

    const userDeleted = await User.findOne({ where: { id } })
    if (userDeleted) {
      User.destroy({ where: { id } })
      res.json({ msg: 'user removed' })
    } else {
      const users = await User.findAll();
      if (users) return res.json(users);
      return res.json(new Error("error"));
    }
  } catch (error) {
    next(error);
  }
});
// [tokenValidations.checkToken, tokenValidations.checkAdmin]
userRoute.post(
  "/",
  async (req, res, next) => {
    const { password, username, email } = req.body;
    try {
      const [newUser, created] = await User.findOrCreate({
        where: { password, username, email },
        include: Rol,
      });
      if (created) {
        newUser.setRol("user");
        newUser.setStatus("active");
        res.json(newUser).send({ msg: "User Created!" });
      } else {
        res.status(400).json({ msg: "user alredy exists" });
      }
    } catch (error) {
      next(error);
    }
  }
);

userRoute.delete("/", async (req, res, next) => {
  try {
    const id = req.query.id;

    if (!id) return res.send({ err: "error" });

    const userDeleted = await User.findByPk(id);
    if (userDeleted) {
      User.destroy({ where: { id } });
      res.json({ msg: "user removed" });
    } else {
      return res.status(400).send({ msg: "user does not exist" });
    }
  } catch (error) {
    next(error);
  }
});

/// ////////////////////Routes Modify Profile//////////////////////////////////////////

userRoute.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let { username, verifyPassword, password, email, profileImg, coverImg, RolId, items } = req.body;
    const user = await User.findByPk(id);
    // console.log(req.body,user)
    if (!user) return res.status(404).send({ error: 'User not found' })

    let stars = 0;

    if (items?.length) stars = items.reduce((acc, item) => {
      return acc + Number(item.description)
    }, 0)

    if (RolId) await user.setStatus(RolId);

    if(verifyPassword) {
      const isValidPassword = await User.prototype.comparePassword(verifyPassword,user.password)
      if(isValidPassword){
        password = await User.prototype.hashPassword(password)
      }else{
        return res.send('Incorrect')
      }
    }
    await user.update({
      username,
      password,
      email,
      profileImg,
      coverImg,
      stars: Number(user.stars) + Number(stars),
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});
module.exports = userRoute;