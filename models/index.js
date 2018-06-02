console.log("Models Index");

var fs = require("fs");
console.log("fs");

var path = require("path");
console.log("path");

var Sequelize = require("sequelize");
console.log("seq");

var basename = path.basename(module.filename);
console.log("base");

var env = process.env.NODE_ENV || "laanc";
console.log("env");
var name = path.join(__dirname , "..\\config\\config.json");
console.log(name);
var config = require(name)[env];
console.log(config);
// config=config.laanc;
var db = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  .forEach(function(file) {
    console.log("file", file);
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
