"use strict";

const { Model, UUIDV4 } = require("sequelize");

class User extends Model {
  static associate(models) {
    // define association here
    User.belongsToMany(models.Card, {
      through: "UserCards",
    });
    User.belongsTo(models.Rol);
    // User.hasOne(models.Status);
    User.belongsTo(models.Status);
    User.hasOne(models.Deck);
  }
}

module.exports = (sequelize, DataTypes) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stars: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
