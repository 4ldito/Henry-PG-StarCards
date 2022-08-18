"use strict";
const { Model } = require("sequelize");

class Status extends Model {
  static associate(models) {
    // Status.belongsTo(models.User)
    Status.hasOne(models.User);
    Status.hasOne(models.Card);
    Status.hasOne(models.Deck);
    Status.hasOne(models.StarsPack);
    Status.hasOne(models.CardPacks);
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
        defaultValue: "active",
        validate: {
          customValidator: (value) => {
            const enums = ["active", "inactive"];
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
