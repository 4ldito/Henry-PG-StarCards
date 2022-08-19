const db = require("../db");
const { User, Rol, UserCards } = db;
const { tokenValidations } = require("../middlewares");

const { Router } = require("express");
const userRoute = Router();
/////////////////////////////////////////////////////////////////////////////////////////////////
userRoute.get("/", async (req, res, next) => {
  try {
    const { id, username } = req.query;
    if (id) {
      const user = await User.findByPK(id);
      if (user) return res.json(user);
      return res.json(new Error("error, User Not Found"));
    } else if (username) {
      const user = await User.findOne({ where: { username: username } });
      if (user) return res.json(user);
      return res.json(new Error("error, User Not Found"));
    } else {
      const users = await User.findAll({ include: [UserCards] });
      if (users) return res.json(users);
      return res.json(new Error("error"));
    }
  } catch (error) {
    next(error);
  }
});

userRoute.post(
  "/",
  [tokenValidations.checkToken, tokenValidations.checkAdmin],
  async (req, res, next) => {
    const { password, username, email } = req.body;
    try {
      const newUser = await User.findOrCreate({
        where: { password, username, email },
        include: Rol,
      });
      if (newUser[1]) {
        newUser[0].setRol("user");
        newUser[0].setStatus("active");
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

    const userDeleted = await User.findOne({ where: { id } });
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
    const { username, password, email, profileImg, coverImg, RolId } = req.body;

    const user = await User.findByPk(id);
    if (RolId) {
      await user.setStatus(RolId);
    }
    await user.update({
      username: username,
      password: password,
      email: email,
      profileImg: profileImg,
      coverImg: coverImg,
    });

    res.json(user).send({ msg: "Data Updated!" });
  } catch (error) {
    next(error);
  }
});
module.exports = userRoute;
