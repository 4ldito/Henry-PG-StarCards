const { Model } = require("sequelize");

class PrivateChat extends Model {
  static associate(models) {
    PrivateChat.belongsTo(models.User);
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
      receiverId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PrivateChat",
    }
  );
  return PrivateChat;
};
