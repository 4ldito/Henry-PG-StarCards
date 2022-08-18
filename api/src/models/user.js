'use strict'

const { Model, UUIDV4 } = require('sequelize')

class User extends Model {
  static associate(models) {
    // define association here
    User.belongsToMany(models.Card, {
      through: 'UserCards'
    })
    User.belongsTo(models.Rol)
    // User.hasOne(models.Status);
    User.belongsTo(models.Status)
    User.hasOne(models.Deck)
  }
}

module.exports = (sequelize, DataTypes) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      stars: {
        type: DataTypes.INTEGER,
        defaultValue: 100
      },
      profileImg: {
        type: DataTypes.STRING,
        defaultValue:
          'https://static.wikia.nocookie.net/starcraft2/images/a/a1/Zerg_SC2_Icon2.jpg/revision/latest?cb=20100826205116&path-prefix=es'
      },
      coverImg: {
        type: DataTypes.STRING,
        defaultValue:
          'https://bnetcmsus-a.akamaihd.net/cms/blog_header/2g/2G4VZH5TIWJF1602720144046.jpg'
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }

    },
    {
      timestamps: false,
      sequelize,
      modelName: 'User'
    }
  )
  return User
}
