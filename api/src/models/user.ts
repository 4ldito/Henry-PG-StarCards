'use strict'

import {
  Model, UUIDV4
} from 'sequelize'

interface UserAttributes {
  id: string
  username: string
  password: string
  email: string
  stars: number
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes>
    implements UserAttributes {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    id!: string
    username!: string
    email!: string
    password!: string
    stars!: number
    static associate (models: any): void {
      // define association here
      User.belongsToMany(models.Card, {
        through: 'UserCards'
      })
      User.belongsTo(models.Rol)
      // User.hasOne(models.Status);
      User.belongsTo(models.Status)
      User.hasOne(models.Deck)
    }
  };
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
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
    }
  }, {
    timestamps: false,
    sequelize,
    modelName: 'User'
  })
  return User
}
