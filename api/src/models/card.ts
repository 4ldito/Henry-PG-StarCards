import {
    Model
} from 'sequelize'

interface CardAttributes {
    id: number
    name: string
    dmg: number
    def: number
    ability: string
    race: string
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Card extends Model<CardAttributes>
        implements CardAttributes {
        id!: number
        name!: string
        dmg!: number
        def!: number
        ability!: string
        race!: string
        static associate(models: any): void {
            Card.belongsToMany(models.User, {
                through: 'UserCards'
            })
            Card.belongsTo(models.Status)
        }
    };
    Card.init({
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
        dmg: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        def: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ability: {
            type: DataTypes.STRING,
            allowNull: false
        },
        race: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Card'
    })
    return Card
}
