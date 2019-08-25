const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

let connection;
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'omologator',
    database: 'burger_db'
  });
}


// initialize table and seed values
var schemaSql = fs.readFileSync(path.join(__dirname, '..', 'db', 'schema.sql'), 'utf8');
var seedsSql = fs.readFileSync(path.join(__dirname, '..', 'db', 'seeds.sql'), 'utf8');
connection.query(schemaSql, (err, result) => {
  connection.query(seedsSql, (err, result) => {
    
  });
});

module.exports = connection;