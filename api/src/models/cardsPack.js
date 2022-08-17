const { Model } = require("sequelize");

class CardsPack extends Model {
  static associate(models) {
    // CardsPack.belongsTo(models.User)
    CardsPack.hasOne(models.Status);
  }
}

module.exports = (sequelize, DataTypes) => {
  CardsPack.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      race: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      cards: {
        type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING(5000))),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CardsPack",
    }
  );
  return CardsPack;
};
