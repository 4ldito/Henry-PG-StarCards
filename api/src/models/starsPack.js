const { Model } = require("sequelize");

class StarsPack extends Model {
  static associate(models) {
    // StarsPack.belongsTo(models.User)
    StarsPack.hasOne(models.Status);
  }
}

module.exports = (sequelize, DataTypes) => {
  StarsPack.init(
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
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "StarsPack",
    }
  );
  return StarsPack;
};
