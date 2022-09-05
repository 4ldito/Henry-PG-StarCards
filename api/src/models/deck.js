"use strict";

const { INTEGER } = require("sequelize");
const { Model } = require("sequelize");

class Deck extends Model {
  static associate(models) {
    Deck.belongsTo(models.User);
    Deck.belongsTo(models.Status);
    Deck.belongsToMany(models.UserCards, { through: "DeckCard"});
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
      cardRepeats:{
          type: DataTypes.STRING(5000) 
      },
      tatalCost:{
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: "Deck",
    }
  );
  return Deck;
};
