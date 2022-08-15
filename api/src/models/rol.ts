import {
  Model
} from 'sequelize'

interface RolAttributes {
  id: number
  rol: string
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Rol extends Model<RolAttributes>
    implements RolAttributes {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    id!: number
    rol!: string
    static associate (models: any): void {
      // Rol.belongsToMany(models.User, {
      //   through: 'User_Rol'
      // })
      Rol.hasOne(models.User)
    }
  };
  Rol.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Rol'
  })
  return Rol
}
