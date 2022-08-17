const { Model } = require("sequelize");

class Rol extends Model {
  static associate(models) {
    // Rol.belongsToMany(models.User, {
    //   through: 'User_Rol'
    // })
    Rol.hasOne(models.User);
  }
}

module.exports = (sequelize, DataTypes) => {
  Rol.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Rol",
    }
  );
  return Rol;
};
