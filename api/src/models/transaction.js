const { Model } = require("sequelize");

class Transaction extends Model {
  static associate(models) {
    Transaction.belongsTo(models.Status);
    Transaction.belongsTo(models.User);
    Transaction.belongsToMany(models.StarsPack, { through: 'Transaction_StarsPack' });
    Transaction.belongsToMany(models.CardPacks, { through: 'Transaction_CardPacks' });
    Transaction.belongsToMany(models.UserCards, { through: 'Transaction_UserCards' });
  }
}

module.exports = (sequelize, DataTypes) => {
  Transaction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: "money",
        validate: {
          customValidator: (value) => {
            const enums = ["money", "stars"];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
      },
      priceStars: {
        type: DataTypes.FLOAT
      },
      paymentId: {
        type: DataTypes.BIGINT,
        // allowNull: false
      },
      priceMoney: {
        type: DataTypes.FLOAT
      }
    },
    {
      sequelize,
      modelName: "Transaction",
      //   timestamps: false
    }
  );
  return Transaction;
};
