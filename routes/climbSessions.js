var express = require("express");
var router = express.Router();
var mysqlDb = require("../src/mysqlConnection");
db = mysqlDb.get();

router.get("/", function (req, res, next) {
  var item_id = req.query.item_id;
  db.query(
    `SELECT * FROM climb_session WHERE item_id = "${item_id}"`,
    function (err, result, fields) {
      if (err) throw err;
      else {
        res.send(JSON.stringify(result));
      }
    }
  );
});

router.post("/", function (req, res, next) {
  console.log(req.body);
  const data = req.body;
  const item_id = data.item_id;
  const hand_strength = data.hand_strength;
  const index_strength = data.index_strength;
  const middle_stregth = data.middle_fingerStregth;
  const ring_strength = data.ring_strength;
  db.query(
    `INSERT INTO climb_session VALUES (${item_id}, ${hand_strength}, ${index_strength}, ${middle_stregth}, ${ring_strength}); `,
    function (err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify(item_id));
    }
  );
});

module.exports = router;
