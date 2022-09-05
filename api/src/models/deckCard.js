"use strict";

const { Model, UUIDV4 } = require("sequelize");

class DeckCard extends Model {
  static associate(models) {
    DeckCard.belongsTo(models.Card);

  }
}

module.exports = (sequelize, DataTypes) => {
  DeckCard.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      repeat:{
        type: DataTypes.INTEGER,
        defaultValue: 1
      }
    },

    {
      timestamps: false,
      sequelize,
      modelName: "DeckCard",
    }
  );

  return DeckCard;
};
