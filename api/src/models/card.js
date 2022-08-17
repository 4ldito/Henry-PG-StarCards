const { Model, DataTypes } = require("sequelize");

class Card extends Model {
  static associate(models) {
    Card.belongsToMany(models.User, {
      through: "UserCards",
    });

    Card.belongsTo(models.Status);
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
        unique: true,
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
            const enums = ["ground", "flying", "all"];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
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
