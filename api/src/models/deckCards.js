"use strict";

const { Model, UUIDV4 } = require("sequelize");

class DeckCard extends Model {
  static associate(models) {
    UserCards.belongsTo(models.User);
    UserCards.belongsTo(models.Card);
    UserCards.belongsTo(models.Status);
    UserCards.belongsToMany(models.Deck, { through: "DeckCard" });
  }
}

module.exports = (sequelize, DataTypes) => {
  UserCards.init(
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
      modelName: "UserCards",
    }
  );

  return UserCards;
};
