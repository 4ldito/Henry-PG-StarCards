const { User } = require("../db");

async function checkUser(req, res, next) {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) return res.json({ error: "User Exist!" });
  next();
}

module.exports = {
  checkUser,
};
