var mysql = require('mysql');
var mysql_host = "localhost";
var mysql_port = 3306;
var mysql_user = "npu";
var mysql_password = "grace0418";
var mysql_database = "productdb2";
var conn_url="mysql://"+mysql_user+":"+mysql_password+"@"+mysql_host+":"+mysql_port+"/"+mysql_database;
console.log(conn_url)
var connection
// var pool  = mysql.createPool({
//   connectionLimit : 10,
//   host            : mysql_host,
//   user            : mysql_user,
//   port            : mysql_port,
//   password        : mysql_password,
//   database        : mysql_database
// });


//* [Note] Add Sequelize for MySQL ORM
var Sequelize = require('sequelize');
var sequelize = new Sequelize(conn_url)
// console.log(sequelize)

var Books_sql = sequelize.define('book_ORM', {
  title: Sequelize.STRING,
  price: Sequelize.DATE
});

module.exports = function () {
    connection = mysql.createConnection({
        host: mysql_host,
        port: mysql_port,
        user: mysql_user,
        password: mysql_password,
        database: mysql_database
    });
    connection.connect(function (err) {
        if (err) {
            console.log(err);
            // throw new Error("Can't connect to MySQL server.");
        } else {
            connection.query("USE " + mysql_database, function (err, rows, fields) {
                if (err) {
                    throw new Error("Missing database.");
                } else {
                    console.log("Successfully selected database.");
                }
            });
        }
    });
    return {
        add: function (data, callback) {
             // Show data sent to backend.
            console.log(data);
            var date = new Date();
            var query = "";
            query += "INSERT INTO books (title, price, date) VALUES (";
            query += connection.escape(data.title) + ", ";
            query += connection.escape(data.price) + ", ";
            query += "'" + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "'";
            query += ")";
             // Show query string to database.
            console.log(query);
            Books_sql.sync({force: true}).then(function () {
              // Table created
              return Books_sql.create({
                title: data.title,
                price: data.price
              });
            });
            connection.query(query, callback);//routes.api.add.js
        },
        update: function (data, callback) {
             // Show data sent to backend.
            console.log(data);
            var query = "UPDATE books SET ";
            query += "title=" + connection.escape(data.title) + ", ";
            query += "price=" + connection.escape(data.price) + " ";
            query += "WHERE id='" + data.id + "'";
            connection.query(query, callback);
        },
        get: function (callback) {
            var query = "SELECT * FROM books ORDER BY id";
             // Show query string to database.
            console.log(query);
            connection.query(query, function (err, rows, fields) {
                if (err) {
                    throw new Error("Error getting rows from 'books'");
                } else {
                    callback(rows);
                }
            });
        },
        remove: function (id, callback) {
            // Show data sent to backend.
            console.log(id);
            var query = "DELETE FROM books WHERE id='" + id + "'";
             // Show query string to database.
            console.log(query);
            connection.query(query, callback);
        }
    };
};