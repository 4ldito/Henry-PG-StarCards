const db = require("../db");
const { User } = db;
const config = require("../config/config");
const jwt = require("jsonwebtoken");

async function signUp(req, res, next) {
  const { email, username, password } = req.body;

  try {
    const newUser = new User({
      email,
      username,
      password: await User.prototype.hashPassword(password),
    });
    const savedUser = await newUser.save();
    await savedUser.setRol("user");
    await savedUser.setStatus("active");
    const token = jwt.sign(
      { id: savedUser.id, rol: savedUser.RolId },
      config.SECRET,
      { expiresIn: 86400 }
    );
    res
      .status(200)
      .json({ token, rol: savedUser.RolId, id: savedUser.id, user: savedUser });
  } catch (err) {
    next(err);
  }
}

async function signIn(req, res, next) {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ where: { email } });
    if (!userFound) return res.json({ error: "Incorrect password or email." });
    const token = jwt.sign({ id: userFound.id }, config.SECRET, {
      expiresIn: 86400,
    });
    const validPassword = await User.prototype.comparePassword(
      password,
      userFound.password
    );
    if (!validPassword)
      return res.json({ error: "Incorrect password or email." });
    res.json({
      token,
      user: userFound,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  signIn,
  signUp,
};
