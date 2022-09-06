const { Model } = require("sequelize");

class UsersUsers extends Model {
  static associate(models) {

  }
}

module.exports = (sequelize, DataTypes) => {
    UsersUsers.init(
    {
      
    },
    {
      sequelize,
      modelName: "UsersUsers",
    }
  );
  return UsersUsers;
};
