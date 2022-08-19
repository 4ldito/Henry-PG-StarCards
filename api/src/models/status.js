"use strict";
const { Model } = require("sequelize");

class Status extends Model {
  static associate(models) {
    Status.hasOne(models.User);
    Status.hasOne(models.Card);
    Status.hasOne(models.Deck);
    Status.hasOne(models.StarsPack);
    Status.hasOne(models.CardPacks);
    Status.hasMany(models.UserCards);
    Status.hasMany(models.Opinion);
    // Status.belongsTo(models.User);
    // Status.belongsTo(models.Card);
    // Status.belongsTo(models.Deck);
    // Status.belongsTo(models.StarsPack);
    // Status.belongsTo(models.CardPacks);
  }
}

module.exports = (sequelize, DataTypes) => {
  Status.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          customValidator: (value) => {
            const enums = ["active", "inactive", "onSale"];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Status",
    }
  );
  return Status;
};
