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
        defaultValue: "user",
        validate: {
          customValidator: (value) => {
            const enums = ["superadmin", "admin", "user"];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Rol",
    }
  );
  return Rol;
};
