"use strict";

const { Model, UUIDV4 } = require("sequelize");

class UserCards extends Model {
  static associate(models) {
    // define association here
    UserCards.belongsTo(models.User);
    UserCards.belongsTo(models.Card);
    UserCards.belongsTo(models.Status);
    // UserCards.belongsTo(models.User);
    // UserCards.hasOne(models.Card);
    // UserCards.hasOne(models.Status);
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
    },
    {
      timestamps: false,
      sequelize,
      modelName: "UserCards",
    }
  );

  return UserCards;
};
