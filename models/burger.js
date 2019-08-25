var orm = require("../config/orm.js");

var burger = {
  // selects all burgers in the database
  selectAll: function (cb) {
    orm.selectAll("burgers", function (res) {
      cb(res);
    });
  },
  // inserts one record into the burgers table
  insertOne: function (burgerName, devoured, cb) {
    orm.insertOne("burgers", ["burger_name", "devoured"], [burgerName, devoured], function (res) {
      cb(res);
    });
  },
  // updates a burger entry
  updateOne: function (idNum, cb) {
    orm.updateOne("burgers", {
      "devoured": true
    }, {
      "id": idNum
    }, function (res) {
      cb(res);
    });
  },
  // deletes a burger entry
  deleteOne: function (idNum, cb) {
    orm.deleteOne("burgers", "id", idNum, function (res) {
      cb(res);
    });
  }
};

module.exports = burger;