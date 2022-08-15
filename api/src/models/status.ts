'use strict'

import {
  Model
} from 'sequelize'

interface StatusAttributes {
  id: number
  status: string
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Status extends Model<StatusAttributes>
    implements StatusAttributes {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    id!: number
    status!: string
    static associate (models: any): void {
      // Status.belongsTo(models.User)
      Status.hasOne(models.User)
      Status.hasOne(models.Card)
      Status.hasOne(models.Deck)
    }
  };
  Status.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Status'
  })
  return Status
}
