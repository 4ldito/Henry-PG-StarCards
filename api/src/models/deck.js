"use strict";

const { Model } = require("sequelize");

class Deck extends Model {
  static associate(models) {
    Deck.belongsTo(models.User);
    Deck.belongsTo(models.Status);
    // Deck.belongsTo(models.User);
    // Deck.hasOne(models.Status);
  }
}

module.exports = (sequelize, DataTypes) => {
  Deck.init(
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
      cardsMax: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      race: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Deck",
    }
  );
  return Deck;
};
