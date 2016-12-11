var mysql = require('mysql');
var mysql_host = '127.0.0.1';
var mysql_port = 3306;
var mysql_user = 'npu';
var mysql_password = 'grace0418';
var mysql_database = 'productdb2';


// var conn = mysql.createConnection('mysql://root:raliclo@127.0.0.1:3306/productdb2?debug=true');

var conn = mysql.createConnection({
  debug 		  : true,
  host            : mysql_host,
  user            : mysql_user,
  port            : mysql_port,
  password        : mysql_password,
  database		  : mysql_database
});
conn.connect();

// conn.connect(function(err) {
// 	conn.query( 'SELECT * from books', function(err, rows) {
//  // And done with the connection.
//     console.log(rows[0]);
//     conn.release();
//  // Don't use the connection here, it has been returned to the pool.
//   });
// if (err) {
// console.error('error connecting: ' + err.stack);
// return;
// }

// console.log('connected as id ' + conn.threadId);
// });


// conn.query('SELECT 1', function(err, rows) {
// // connected! (unless `err` is set)
// console.log(err, rows);
// });



// var pool  = mysql.createPool({
//   connectionLimit : 10,
//   host            : mysql_host,
//   user            : mysql_user,
//   port            : mysql_port,
//   password        : mysql_password
// });

// pool.getConnection(function(err, conn) {
//  // Use the connection
//   conn.query( 'SELECT * from books', function(err, rows) {
//  // And done with the connection.
//     console.log(rows[0]);
//     conn.release();
//  // Don't use the connection here, it has been returned to the pool.
//   });
// });
