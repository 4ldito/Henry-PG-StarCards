const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config/config");

const basename = path.basename(__filename);
const env =
  process.env.NODE_ENV !== undefined ? process.env.NODE_ENV : "development";
const actualConfig = config[env];
const db = {};
// const modelsDirectory: string = __dirname + '/models'
const modelsDirectory = path.join(__dirname, "/models");

// let sequelize: any
// if (actualConfig.use_env_variable !== null) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], actualConfig)
// } else {
const sequelize = new Sequelize(
  actualConfig.database,
  actualConfig.username,
  actualConfig.password,
  actualConfig
);
// }

fs.readdirSync(modelsDirectory)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  })
  .forEach((file) => {
    const model = require(path.join(modelsDirectory, file))(
      sequelize,
      DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate !== null) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// const models = { ...db.sequelize.models }
module.exports = db;
