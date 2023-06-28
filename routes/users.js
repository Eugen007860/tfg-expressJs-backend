var express = require("express");
var router = express.Router();
var mysqlDb = require("../src/mysqlConnection");
db = mysqlDb.get();

router.get("/", function (req, res, next) {
  db.query("SELECT user_id FROM `users`", function (err, result, fields) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

router.post("/", function (req, res, next) {
  console.log(req.body);
  const data = req.body;
  const email = data.email;
  const password = data.password;

  db.query(
    `SELECT user_id from users WHERE email = '${email}' AND password = '${password}'`,
    function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.send(JSON.stringify(result));
    }
  );
});

module.exports = router;
