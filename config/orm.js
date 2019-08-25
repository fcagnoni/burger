const connection = require('./connection');

function columnValueMapToSql(columnValueMap) {
  let columnValueSqls = [];
  for (var property in columnValueMap) {
    if (columnValueMap.hasOwnProperty(property))

      // skip undefined values 
      if (columnValueMap[property] === undefined) {
        continue;
      }

    // escape string values with  ' '
    if (typeof columnValueMap[property] === "string") {
      columnValueSqls.push(`${property} = '${columnValueMap[property]}'`);
    }
    else {
      columnValueSqls.push(`${property} = ${columnValueMap[property].toString()}`);
    }
  }
  return columnValueSqls.join(',\n');
}

module.exports.selectAll = (tableName, cb) => {
  const query = `SELECT * FROM ${tableName};`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    cb(result);
  })
};

module.exports.insertOne = (tableName, columns, values, cb) => {
  let query = `INSERT INTO ${tableName}\n`;
  
  // columns to insert
  query += "(\n" + columns.join(',\n') + "\n)\n";


  // add '?, ' for each column
  query += "VALUES (\n " + columns.map(() => '?').join(',\n ') + '\n);';
  

  console.group('insertOne');
  console.log('query', query);
  console.groupEnd();

  connection.query(query, values, (err, result) => {
    if (err) throw err;
    cb(result);
  })
};

module.exports.updateOne = (tableName, columnValueMap, condition, cb) => {
    let query = `UPDATE ${tableName}\n`;
    query += "SET\n";
    query += columnValueMapToSql(columnValueMap) + "\n";
    query += "WHERE " + columnValueMapToSql(condition) + ";";

    console.group('updateOne');
    console.log('query', query);
    console.groupEnd();


    connection.query(query, (err, result) => {
      if (err) throw err;
      cb(result);
    });
};
