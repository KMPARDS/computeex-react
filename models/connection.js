const mysql = require('mysql');

module.exports = options => {
  const connection = mysql.createConnection(options);

  connection.connect(error => {
    if(error) throw error;
    console.log('Connection database success!');
  });

  return (query, args) => new Promise(function(resolve, reject) {
    connection.query(query, args, (error, results, fields) => {
      if (error) reject(error);
      // console.log(results);
      resolve(results);
    });
  });
}
