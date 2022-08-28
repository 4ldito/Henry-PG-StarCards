const { Model } = require("sequelize");

class PrivateChat extends Model {
  static associate(models) {
    PrivateChat.belongsToMany(models.User, { through: "User-PrivChat" });
    PrivateChat.hasMany(models.Message);
  }
}

module.exports = (sequelize, DataTypes) => {
  PrivateChat.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      modelName: "PrivateChat",
    }
  );
  return PrivateChat;
};
