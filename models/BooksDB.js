var mysql = require('mysql');
var mysql_host = "localhost";
var mysql_port = 3306;
var mysql_user = "npu";
var mysql_password = "grace0418";
var mysql_database = "productdb2";
var connection;

// var pool  = mysql.createPool({
//   connectionLimit : 10,
//   host            : mysql_host,
//   user            : mysql_user,
//   port            : mysql_port,
//   password        : mysql_password,
//   database        : mysql_database
// });

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