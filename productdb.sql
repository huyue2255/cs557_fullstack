DROP DATABASE IF EXISTS productdb2;
CREATE DATABASE productdb2;
USE productdb2;
CREATE TABLE IF NOT EXISTS books (
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    date VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);
select * from productdb2.books;
