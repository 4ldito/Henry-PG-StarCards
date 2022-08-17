import { Model } from 'sequelize'

interface cardsPackAttributes {
  id: number
  name: string
  price: number
  race: string
  cards: string[]
}

module.exports = (sequelize: any, DataTypes: any) => {
  class CardsPack extends Model<cardsPackAttributes>
    implements cardsPackAttributes {
    id!: number
    name!: string
    price!: number
    race!: string
    cards!: string[]
    static associate (models: any): void {
      // CardsPack.belongsTo(models.User)
      CardsPack.hasOne(models.Status)
    }
  };
  CardsPack.init({
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
    race: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cards: {
      type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING(5000))),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CardsPack'
  })
  return CardsPack
}
