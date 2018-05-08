var mysql = require('mysql');
var inquirer = require('inquirer');

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
function showInventory() {

    connection.query('SELECT *  FROM products', function (error, results, fields) {
        //console.log(results)
        console.log("===========================================")
        for (var i = 0; i < results.length; i++) {

            console.log(
                results[i].item_id + " | " +
                results[i].product_name + " | " +
                " $" + results[i].price + " | " +
                results[i].department_name + " | " +
                results[i].stock_quantity + " In Stock" + "\n")
        }
        console.log("===========================================")
    });

};
var choicesArray = [];

function selectedChoices() {
    connection.query('SELECT *  FROM products', function (error, results, fields) {
        if (error) throw error;
        console.log("===========================================")
        results.forEach(item => {
            choicesArray.push(item.product_name)

        });
        console.log(choicesArray)
        console.log("===========================================")

    });

};

//selectedChoices();

//First Prompt to Allow User to Pick Items to purchase

inquirer.prompt([
    {
        type: 'checkbox',
        name: 'shopList',
        message: 'What are you purchasing?',
        choices: choicesArray
    }

])
    .then(answers => {
        console.log( JSON.stringify(answers.shopList))
    });


// //Show page confirming purchases
// function showCart() {
//     connection.query('SELECT * FROM products WHERE isSelected = true', function (error, results, fields) {
//         if (error) throw error;
//         for (var i = 0; i < results.length; i++) {

//             console.log(//results[i].id + "|" + results[i].title + "|" + results[i].price + "|" + results[i].quantity)
//                 console.log("===========================================")
//             )
//         };
//     });
// };

// //Prompt continue shopping or checkout inquirer confirm ready to checkout or continue shopping;    
// inquirer
//     .prompt([
//         {
//             type: 'confirm',
//             name: 'checkout',
//             message: 'Would you like to checkout?'
//         }
//     ])
//     .then(answers => {
//         if (answers.checkout === true) {
//             //1.showPurchases();//Update/Delete- checkout shows receipt
//             console.log("purchase made")
//         } else {
//             //Cnt shopping returns to prev page
//             //2.showInventory();
//             console.log("keep shopping")
//         }

//     })


// function showPurchase() {
//     showCart();
//     console.log("purchases made");
//     //Decrease items quantity  
//     connection.query('UPDATE * FROM products DELETE quantity WHERE isSelected = true', function (error, results, fields) {
//         if (error) throw error;
//         showNewInventory();
//     }
//     );
// };

// //Update- shows shopping updated inventory
// function showNewInventory() {
//     connection.query('SELECT * FROM products'), function (error, results, fields) {
//         if (error) throw error;
//         for (var i = 0; i < results.length; i++) {
//             //inquirer(prompt)
//             console.log(//results[i].id + "|" + results[i].title + "|" + results[i].price + "|" + results[i].quantity)
//                 console.log("===========================================")
//             )
//         };
//     };
// };
//Prompt another purchase?
 connection.end(); 