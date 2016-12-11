var mysql = require('mysql');
var mysql_host = "localhost";
var mysql_user = "root";
var mysql_password = "";
var mysql_database = "productdb2";
var connection;

module.exports = function () {
    connection = mysql.createConnection({
        host: mysql_host,
        user: mysql_user,
        password: mysql_password
    });
    connection.connect(function (err) {
        if (err) {
            throw new Error("Can't connect to MySQL server.");
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
            var date = new Date();
            var query = "";
            query += "INSERT INTO books (title, price, date) VALUES (";
            query += connection.escape(data.title) + ", ";
            query += connection.escape(data.price) + ", ";
            query += "'" + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "'";
            query += ")";
            connection.query(query, callback);//routes.api.add.js
        },
        update: function (data, callback) {
            var query = "UPDATE books SET ";
            query += "title=" + connection.escape(data.title) + ", ";
            query += "price=" + connection.escape(data.price) + " ";
            query += "WHERE id='" + data.id + "'";
            connection.query(query, callback);
        },
        get: function (callback) {
            var query = "SELECT * FROM books ORDER BY id";
            connection.query(query, function (err, rows, fields) {
                if (err) {
                    throw new Error("Error getting rows from 'books'");
                } else {
                    callback(rows);
                }
            });
        },
        remove: function (id, callback) {
            var query = "DELETE FROM books WHERE id='" + id + "'";
            connection.query(query, callback);
        }
    };
};