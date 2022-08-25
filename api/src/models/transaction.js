const { Model } = require("sequelize");

class Transaction extends Model {
  static associate(models) {
    Transaction.belongsTo(models.Status);
    Transaction.belongsTo(models.User);
    Transaction.belongsToMany(models.StarsPack, { through: 'Transaction_StarsPack' });
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
      paymentId: {
        type: DataTypes.BIGINT,
        // allowNull: false
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
