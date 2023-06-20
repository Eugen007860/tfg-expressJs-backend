var express = require("express");
var router = express.Router();
var mysqlDb = require("../src/mysqlConnection");
db = mysqlDb.get();

router.get("/", function (req, res, next) {
  var item_id = req.query.item_id;
  db.query(`SELECT * FROM climb_env WHERE item_id = "${item_id}"`, function (err, result, fields) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

router.post("/", function (req, res, next) {
  console.log(req.body);
  const data = req.body;
  const item_id = data.item_id;
  const temperature = data.temperature;
  const humidity = data.humidity;
  const location = data.location;
  const strengthGraph = data.strengthGraph
  db.query(
    `INSERT INTO climb_env VALUES ("${item_id}", "${location}", ${temperature},"${strengthGraph}", ${humidity} ); `,
    function (err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify(item_id));
    }
  );
});

module.exports = router;
