import { Model } from 'sequelize'

interface StarsPackAttributes {
  id: number
  name: string
  price: number
  stars: number
}

module.exports = (sequelize: any, DataTypes: any) => {
  class StarsPack extends Model<StarsPackAttributes>
    implements StarsPackAttributes {
    id!: number
    name!: string
    price!: number
    stars!: number
    static associate (models: any): void {
      // StarsPack.belongsTo(models.User)
      StarsPack.hasOne(models.Status)
    }
  };
  StarsPack.init({
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'StarsPack'
  })
  return StarsPack
}
