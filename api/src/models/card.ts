import { Model, DataTypes } from 'sequelize'

interface CardAttributes {
  id: number
  name: string
  Gdmg: number
  Admg: number
  life: string
  ability: string
  abilities: string[]
  race: string
  cost: number
  movement: 'enum'
  image: string
}

module.exports = (sequelize: any) => {
  class Card extends Model<CardAttributes>
    implements CardAttributes {
    id!: number
    name!: string
    Gdmg!: number
    Admg!: number
    life!: string
    ability!: string
    abilities!: string[]
    race!: string
    cost!: number
    movement!: 'enum'
    image!: string
    static associate (models: any): void {
      Card.belongsToMany(models.User, {
        through: 'UserCards'
      })

      Card.belongsTo(models.Status)
    }
  };
  Card.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Gdmg: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Admg: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    life: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ability: {
      type: DataTypes.STRING,
      allowNull: false
    },
    abilities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    race: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    movement: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Card'
  })
  return Card
}
