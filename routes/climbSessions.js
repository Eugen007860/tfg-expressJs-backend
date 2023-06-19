var express = require("express");
var router = express.Router();
var mysqlDb = require("../src/mysqlConnection");
db = mysqlDb.get();

router.get("/", function (req, res, next) {
  var item_id = req.query.item_id;
  db.query(`SELECT * FROM climb_session WHERE item_id = "${item_id}"`, function (err, result, fields) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
