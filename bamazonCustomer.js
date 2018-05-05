var mysql = require('mysql');
// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "testuser",

    // Your password
    password: "",
    database: "bamazon_db"
});

//create- 
connection.connect();
connection.query('SELECT *  FROM products', function (error, results, fields) {
    console.log(results)
});  

