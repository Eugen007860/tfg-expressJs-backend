var express = require("express");
var router = express.Router();
var mysqlDb = require("../src/mysqlConnection");
db = mysqlDb.get();

router.get("/", function (req, res, next) {
  const userId = req.query.userId;
  const handPart = req.query.handPart;

  console.log({userId,handPart});
  //TODO: cambiar hand_strength por la parte de la mano que querramos estudiar.
  //TODO: cambiar user_id = "2" por el id del usuario que nos interese ver.
  db.query(
    `SELECT u.user_id, b.date, c.${handPart} as "strength"
        FROM users u, climb_item b, climb_session c
        WHERE u.user_id = b.user_id AND c.item_id = b.climb_item_id AND u.user_id = "${userId}"
        ORDER BY b.date;`,
    function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.send(JSON.stringify(result));
    }
  );
});

module.exports = router;
