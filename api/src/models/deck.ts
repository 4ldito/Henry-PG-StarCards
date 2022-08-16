'use strict'

import {
  Model
} from 'sequelize'

interface DeckAttributes {
  id: number
  name: string
  cardsMax: number
  race: string
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Deck extends Model<DeckAttributes>
    implements DeckAttributes {
    /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
    id!: number
    name!: string
    cardsMax!: number
    race!: string
    static associate (models: any): void {
      Deck.hasOne(models.User)
      Deck.belongsTo(models.Status)
    }
  };
  Deck.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardsMax: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    race: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Deck'
  })
  return Deck
}
