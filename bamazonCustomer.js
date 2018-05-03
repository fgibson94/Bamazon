var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Phrenology01!',
    database: 'bamazon_db'
});

connection.connect();

connection.query('SELECT *  FROM products', function (error, results, fields) {
    console.log(results)
});

connection.end();