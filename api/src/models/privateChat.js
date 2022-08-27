const { Model } = require("sequelize");

class PrivateChat extends Model {
  static associate(models) {
    PrivateChat.belongsTo(models.User);
    PrivateChat.hasMany(models.Message);
    PrivateChat.hasOne(models.User, { as: "ReceiverUser" });
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
