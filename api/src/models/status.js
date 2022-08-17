"use strict";
const { Model } = require("sequelize");

class Status extends Model {
  static associate(models) {
    // Status.belongsTo(models.User)
    Status.hasOne(models.User);
    Status.hasOne(models.Card);
    Status.hasOne(models.Deck);
    Status.hasOne(models.StarsPack);
    Status.hasOne(models.CardsPack);
  }
}

module.exports = (sequelize, DataTypes) => {
  Status.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Status",
    }
  );
  return Status;
};
