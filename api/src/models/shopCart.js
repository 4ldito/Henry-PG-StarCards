const { Model } = require("sequelize");

class ShopCart extends Model {
  static associate(models) {
    ShopCart.belongsTo(models.Status);
    ShopCart.belongsTo(models.User);
  }
}

module.exports = (sequelize, DataTypes) => {
  ShopCart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      packTypes: {
        type: DataTypes.STRING,
        defaultValue: "starsPack",
        validate: {
          customValidator: (value) => {
            const enums = ["starsPack", "cardsPack"];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "ShopCart",
      //   timestamps: false
    }
  );
  return ShopCart;
};
