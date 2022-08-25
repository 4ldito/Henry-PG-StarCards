const { Model } = require("sequelize");

class Message extends Model {
  static associate(models) {
    Message.belongsTo(models.PrivateChat);
  }
}

module.exports = (sequelize, DataTypes) => {
  Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      message: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
