const { Model } = require("sequelize");

class CardPacks extends Model {
  static associate(models) {
    CardPacks.belongsTo(models.Status);
    CardPacks.belongsToMany(models.User, { through: "FavPacks" });
    CardPacks.belongsToMany(models.Transaction, {
      through: "Transaction_CardPacks",
    });
  }
}

module.exports = (sequelize, DataTypes) => {
  CardPacks.init(
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
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      race: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      cards: {
        type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CardPacks",
    }
  );
  return CardPacks;
};
