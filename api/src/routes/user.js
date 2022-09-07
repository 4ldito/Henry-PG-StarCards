const db = require("../db");
const { User, UserCards, PrivateChat, Message, Game } = db;
const { tokenValidations } = require("../middlewares");

const { Router } = require("express");
const userRoute = Router();
/// /////////////////////////////////////////////////////////////////////////////////////////////
userRoute.get("/", async (req, res, next) => {
  try {
    const { id, email } = req.query;
    if (id) {
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
        include: [
          { model: UserCards },
          {
            model: PrivateChat,
            include: [
              { model: Message },
              {
                model: User,
                attributes: ["id", "username"],
              },
            ],
          },
        ],
      });
      if (user) return res.json(user);
      return res.status(404).json({ error: "error, User Not Found" });
    } else if (email) {
      const user = await User.findOne({ where: { email } });
      if (user) return res.json(user);
      return res.send("User not Found");
    }

    const users = await User.findAll({ include: UserCards });
    if (users) return res.json(users);
    return res.json(new Error("error"));
  } catch (error) {
    next(error);
  }
});

userRoute.get("/games", async (req, res, next) => {
  try {
    const { id } = req.query;
    const user = await User.findByPk(id, {
      include: [{ model: Game }],
    });
    return res.json({ games: user.Games });
  } catch (error) {
    next(error);
  }
});

userRoute.get("/:email", async (req, res, next) => {
  const { email } = req.params;

  const user = await User.findOne({ where: { email } });
});

userRoute.get("/username/:username", async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ where: { username } });

    return res.json(user);
  } catch (error) {
    next(error);
  }
});

userRoute.delete("/", async (req, res, next) => {
  try {
    const id = req.query.id;

    if (!id) return res.send({ err: "error" });

    const userDeleted = await User.findOne({ where: { id } });
    if (userDeleted) {
      User.destroy({ where: { id } });
      res.json({ msg: "user removed" });
    } else {
      const users = await User.findAll();
      if (users) return res.json(users);
      return res.json(new Error("error"));
    }
  } catch (error) {
    next(error);
  }
});

// userRoute.delete("/", async (req, res, next) => {
//   try {
//     const id = req.query.id;

//     if (!id) return res.send({ err: "error" });

//     const userDeleted = await User.findByPk(id);
//     if (userDeleted) {
//       User.destroy({ where: { id } });
//       res.json({ msg: "user removed" });
//     } else {
//       return res.status(400).send({ msg: "user does not exist" });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

/// ////////////////////Routes Modify Profile//////////////////////////////////////////

userRoute.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let {
      username,
      verifyPassword,
      password,
      email,
      profileImg,
      coverImg,
      RolId,
      StatusId,
      items,
    } = req.body;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).send({ error: "User not found" });

    let stars = 0;

    if (items?.length)
      stars = items.reduce((acc, item) => {
        return acc + Number(item.description) * Number(item.quantity);
      }, 0);

    if (RolId) await user.setRol(RolId);
    if (StatusId) await user.setStatus(StatusId);

    if (!verifyPassword && password) {
      password = await User.prototype.hashPassword(password);
    }

    if (verifyPassword) {
      const isValidPassword = await User.prototype.comparePassword(
        verifyPassword,
        user.password
      );
      if (isValidPassword) {
        password = await User.prototype.hashPassword(password);
      } else {
        return res.send("Incorrect");
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

userRoute.patch("/defaultDeck/:id/:userId", async (req, res, next) => {
  try {
    const { id, userId } = req.params;
    console.log("id " + id);
    console.log(userId);
    const user = await User.findByPk(userId);
    await user.update({ defaultDeck: id });
    return res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = userRoute;
