const { Model } = require("sequelize");

class Opinion extends Model {
  static associate(models) {
    // Opinion.belongsTo(models.User)
    Opinion.belongsTo(models.Status);
    Opinion.belongsTo(models.User);
    Opinion.belongsTo(models.Card);
  }
}

module.exports = (sequelize, DataTypes) => {
    Opinion.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        comment: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        score: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Opinion",
      }
    );
    return Opinion;
};
      