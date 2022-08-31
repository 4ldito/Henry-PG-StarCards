const { Model, DataTypes } = require("sequelize");

class Card extends Model {
  static associate(models) {
    Card.hasMany(models.UserCards);
    Card.hasMany(models.DeckCard);
    Card.belongsTo(models.Status);
    Card.hasMany(models.Opinion);
  }
}

module.exports = (sequelize) => {
  Card.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Gdmg: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Admg: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      life: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ability: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      abilities: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      race: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      movement: {
        type: DataTypes.STRING,
        validate: {
          customValidator: (value) => {
            const enums = ["Ground", "Flying"];
            if (!enums.includes(value)) {
              throw new Error("not a valid movement option");
            }
          },
        },
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Card",
    }
  );
  return Card;
};
