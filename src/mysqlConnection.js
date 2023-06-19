var mysql = require("mysql"),
  db;

module.exports = {
  init: function (conf) {
    if (!db) {
      db = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "tfg_climb_database",
      });
    }
  },
  get: function () {
    if (!db) {
      throw new Error(
        "The db pool has not been initialized, call init({}) prior to get()."
      );
    }

    return db;
  },
};
