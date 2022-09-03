"use strict";

const { Model } = require("sequelize");

class Game extends Model {
  static associate(models) {
    Game.belongsToMany(models.User, { through: "PlayedGame" });
  }
}

module.exports = (sequelize, DataTypes) => {
  Game.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      info: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
