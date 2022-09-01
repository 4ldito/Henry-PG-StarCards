"use strict";

const { Model, UUIDV4 } = require("sequelize");

class UserCards extends Model {
  static associate(models) {
    UserCards.belongsTo(models.User);
    UserCards.belongsTo(models.Card);
    UserCards.belongsTo(models.Status);
    UserCards.belongsToMany(models.Deck, { through: "DeckCard" });
    UserCards.belongsToMany(models.Transaction, { through: 'Transaction_UserCards' });

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
      price: {
        type: DataTypes.FLOAT,
        allowNull: true
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
