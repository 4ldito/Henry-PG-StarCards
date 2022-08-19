const { Model } = require("sequelize");

class Rol extends Model {
  static associate(models) {
    Rol.hasOne(models.User);
    // Rol.belongsTo(models.User);
  }
}

module.exports = (sequelize, DataTypes) => {
  Rol.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
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
