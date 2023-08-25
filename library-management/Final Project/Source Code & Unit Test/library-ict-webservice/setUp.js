function run (index, max) {
  const { Client } = require('pg');
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://jyamevtnefikev:c21391120be4cd964cfe0b8f1c5395f58da938b9c8ce7fec59fc6c88efa96330@ec2-54-235-80-137.compute-1.amazonaws.com:5432/d34otthgq56sk',
    ssl: true,
  });
  client.connect();
  // console.log(query[index])
  client.query(query[index], (err, res) => {
    if (err) {
      console.log(err)
      client.end();
      return
    } else {
      console.log(res)
    }
    client.end();
    if (max) {
      if (index === max) {
        return
      }
      run(index + 1, max)
    } else if (index + 1 < query.length) {
      run(index + 1)
    }
  });
}

let date = new Date();
date = new Date(date.getTime() - 1 * 86400 * 1000)

let borrowDate = date.getUTCFullYear() + '-' +
  ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
  ('00' + date.getUTCDate()).slice(-2)

date = new Date(date.getTime() + 1 * 86400 * 1000)
let returnDate = date.getUTCFullYear() + '-' +
  ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
  ('00' + date.getUTCDate()).slice(-2)

var query = [
`CREATE TYPE copyType AS ENUM ('REFERENCE', 'BORROWABLE', 'LENT');`,

`CREATE TYPE genderType AS ENUM ('F', 'M');`,

`CREATE TYPE roleType AS ENUM ('LIBRARIAN', 'CUSTOMER', 'ADMINISTRATOR');`,

`CREATE TYPE currentBorrow AS ENUM ('REGISTERED', 'ACTIVE', 'RETURNED', 'OVERDUE');`,

`CREATE TABLE book (
bookNumber varchar(6) NOT NULL PRIMARY KEY,
title varchar(256) NOT NULL,
publisher varchar(256) NOT NULL,
ISBN varchar(11) NOT NULL,
classification varchar(256) NOT NULL,
author varchar(256) NOT NULL
);`,

`CREATE TABLE copy (
copyNumber varchar(8) NOT NULL PRIMARY KEY,
bookNumber varchar(6) NOT NULL REFERENCES book (bookNumber) ON DELETE CASCADE,
price float NOT NULL,
type copyType NOT NULL
CHECK (price >= 0)
);`,


`CREATE TABLE users (
username varchar(30) NOT NULL PRIMARY KEY,
password varchar(30) NOT NULL,
fullName varchar(100) NOT NULL,
email varchar(100) NOT NULL,
gender genderType NOT NULL,
contact varchar(100) NOT NULL,
studyPeriod varchar(100) DEFAULT NULL,
studentId varchar(8) DEFAULT NULL,
role roleType NOT NULL
);`,

`CREATE TABLE borrowinfo (
borrowId SERIAL NOT NULL PRIMARY KEY,
username varchar(30) NOT NULL REFERENCES users (username) ON DELETE CASCADE,
copyNumber varchar(8) NOT NULL REFERENCES copy (copyNumber) ON DELETE CASCADE,
current currentBorrow NOT NULL,
borrowDate date NOT NULL,
returnDate date NOT NULL
);`,

`INSERT INTO book (bookNumber, title, publisher, ISBN, classification, author) VALUES
('SC0001', 'Science 101', 'Shortmans', '71448', 'Science', 'Nguyen Quoc Huy');`,

`INSERT INTO copy (copyNumber, bookNumber, price, type) VALUES
('SC000101', 'SC0001', 50000, 'REFERENCE'),
('SC000102', 'SC0001', 50000, 'BORROWABLE');`,

`INSERT INTO users (username, password, fullName, email, gender, contact, studyPeriod, studentId, role) VALUES
('customer1', 'customer1', 'Nguyen Quoc Huy', 'customer1@gmail.com', 'M', 'Ha Noi', '2014-2019', '20141976', 'CUSTOMER'),
('librarian1', 'librarian1', 'Chu Quoc Hung', 'librarian1@gmail.com', 'M', 'Ha Noi', NULL, NULL, 'LIBRARIAN');`,

`INSERT INTO book (bookNumber, title, publisher, ISBN, classification, author) VALUES
('LT0001', 'Daughters of the Night Sky', 'Amazon', 'B01MXPF3TY', 'Novel', 'Aimie K. Runyan'),
('LT0002', 'Halsey Street', 'Amazon', 'B01MXPF3TT', 'Novel', 'Naima Coster'),
('CS0001', 'Hackers: Heroes of the Computer Revolution', 'Amazon', '0141000511', 'Computer Science', 'Steven Levy'),
('CS0002', 'The Pragmatic Programmer: From Journeyman to Master', 'Amazon', 'B004HOXBMY', 'Computer Science', 'Andrew Hunt'),
('CB0001', 'The Smitten Kitchen Cookbook: Recipes and Wisdom from an Obsessive Home Cook', 'Amazon', '030759565X', 'Cookbook', 'Deb Perelman'),
('CB0002', 'New Cook Book (Better Homes & Gardens New Cookbooks)', 'Amazon', '0696215322', 'Cookbook', 'Better Homes and Gardens'),
('PL0002', 'Barrons AP U.S. Government and Politics, 10th Edition', 'Amazon', '1438010958', 'Politics', 'Curt Lader M.A'),
('PL0001', 'Politics (Dover Thrift Editions)', 'Amazon', '0486414248', 'Politics', 'Aristotle');`,

`INSERT INTO copy(copyNumber, bookNumber, price, type) VALUES
('LT000101', 'LT0001', 40000, 'REFERENCE'),
('LT000102', 'LT0001', 40000, 'BORROWABLE'),
('CS000101', 'CS0001', 60000, 'REFERENCE'),
('CS000102', 'CS0001', 60000, 'BORROWABLE'),
('PL000101', 'PL0001', 90000, 'REFERENCE'),
('PL000102', 'PL0001', 90000, 'BORROWABLE'),
('CB000101', 'CB0001', 110000, 'REFERENCE'),
('CB000102', 'CB0001', 110000, 'BORROWABLE'),
('LT000201', 'LT0002', 80000, 'REFERENCE'),
('LT000202', 'LT0002', 80000, 'BORROWABLE'),
('CS000201', 'CS0002', 150000, 'REFERENCE'),
('CS000202', 'CS0002', 150000, 'BORROWABLE'),
('PL000201', 'PL0002', 250000, 'REFERENCE'),
('PL000202', 'PL0002', 250000, 'BORROWABLE'),
('CB000201', 'CB0002', 170000, 'REFERENCE'),
('CB000202', 'CB0002', 170000, 'BORROWABLE');`,

`INSERT INTO copy(copyNumber, bookNumber, price, type) VALUES
('LT000103', 'LT0001', 40000, 'LENT')`,

`INSERT INTO users (username, password, fullName, email, gender, contact, studyPeriod, studentId, role) VALUES
('huynq123', 'huynq123', 'Nguyen Quoc Huy', 'huynq123@gmail.com', 'M', 'Ha Noi', '2014-2019', '20141976', 'CUSTOMER'),
('hungcq123', 'hungcq123', 'Chu Quoc Hung', 'hungcq123@gmail.com', 'M', 'Ha Noi', NULL, NULL, 'LIBRARIAN');`,

`INSERT INTO borrowinfo (username, copyNumber, borrowDate, returnDate, current) VALUES
('huynq123', 'LT000103', '${borrowDate}', '${returnDate}', 'REGISTERED')`,
]



run(query.length - 1)
