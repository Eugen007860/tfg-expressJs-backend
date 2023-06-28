var express = require("express");
var router = express.Router();
var mysqlDb = require("../src/mysqlConnection");
db = mysqlDb.get();

router.get("/", function (req, res, next) {
  const user_id = req.query.user_id
  db.query(`SELECT * FROM climb_item WHERE user_id = "${user_id}" order by date`, function (err, result, fields) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

router.post("/", function (req, res, next) {
  const date = String(req.body.date);
  const description = String(req.body.description);
  const image = String(req.body.image);
  const user_id = String(req.body.user_id);

  db.query(
    "SELECT max(climb_item_id) max_id FROM climb_item",
    function (err, result, fields) {
      if (err) throw err;
      const nextId = String(result[0].max_id - "0" + 1);
      db.query(
        `INSERT INTO climb_item VALUES ("${nextId}", "${user_id}", "${date}", "${description}", "${image}"); `,
        function (err, result, fields) {
          if (err) throw err;
          res.send(JSON.stringify(nextId));
        }
      );
    }
  );
});


router.delete("/", function (req, res, next) {
  console.log(req.query.id)
  const id = req.query.id
  db.query(`DELETE FROM climb_item WHERE climb_item.climb_item_id = '${id}'`, function (err, result, fields) {
    if (err) throw err;
      res.send(JSON.stringify(id));
  });
});

module.exports = router;
