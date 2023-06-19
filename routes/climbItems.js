var express = require("express");
var router = express.Router();
var mysqlDb = require("../src/mysqlConnection");
db = mysqlDb.get();

router.get("/", function (req, res, next) {
  db.query("SELECT * FROM `climb_item`", function (err, result, fields) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
