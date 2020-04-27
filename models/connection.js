const mysql = require('mysql');

module.exports = (options) => {
  let connection;

  function connectToDb() {
    console.log('Connecting to the database...');
    connection = mysql.createConnection(options);

    connection.connect((error) => {
      if (error) {
        console.log(error);
        setTimeout(connectToDb, 10000);
      }
      console.log('Connection database success!');
    });

    connection.on('error', (error) => {
      console.log('Error happenned', Date.now(), error);
      if (error.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Reconnecting DB...');
        connectToDb();
      }
    });
  }

  connectToDb();

  return (query, args) =>
    new Promise(function (resolve, reject) {
      connection.query(query, args, (error, results, fields) => {
        if (error) reject(error);
        // console.log(results);
        resolve(results);
      });
    });
};
