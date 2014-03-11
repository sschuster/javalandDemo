var path = require("path");
var Sequelize = require("sequelize");

var persistence = new Sequelize("javalanddemo", "username", "password", {
    dialect: "sqlite",
    storage: "./javalanddemo.sqlite"
});

var Todo = persistence.import(path.join(__dirname, "/model/todo"));
persistence.sync();

module.exports = {
    Todo: Todo
};
