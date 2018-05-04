//add column isSelected BOOLEAN to database 
var inquirer = require('inquirer'); 
var mysql = require('mysql');  
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bamazon_db'
});   

//create- 
    connection.connect(); 
    connection.query('SELECT *  FROM products', function (error, results, fields) {
        console.log(results) });  

//Read- Prompt user to pick purchase inquirer checkbox choices from showInventory();
inquirer.prompt([/* Show options to buy */]).then(answers => {    
// showCart();

//connection.query('UPDATE products WHERE isSelected = false to true', function (error, results, fields) { };
//console.log(results) }); });

function showInventory() {connection.query('SELECT *  FROM products', function (error, results, fields) {
    if (error) throw error;
    for (var i = 0; i < results.length; i++){
        //inquirer(prompt)         
        console.log (//results[i].id + "|" + results[i].title + "|" + results[i].price + "|" + results[i].quantity)
        console.log ("===========================================")
            }     
        )}
};

//Show page confirming purchases
function showCart() {connection.query('SELECT * FROM products WHERE isSelected = true', function (error, results, fields){
    if (error) throw error;
    for (var i = 0; i < results.length; i++){
        
        console.log (//results[i].id + "|" + results[i].title + "|" + results[i].price + "|" + results[i].quantity)
        console.log ("===========================================")
};};};

//Prompt continue shopping or checkout inquirer confirm ready to checkout or continue shopping;    
            //1.showPurchases();    
            //Cnt shopping returns to prev page
            //2.showInventory();
            //Update/Delete- checkout shows receipt
function showPurchase(){
            showCart(); 
            console.log("purchases made"); 
             //Decrease items quantity  
    connection.query('UPDATE * FROM products DELETE quantity WHERE isSelected = true', function(error, results, fields){
        if(error) throw error;     
        showNewInventory();
    };
 };
                     
//Update- shows shopping updated inventory
function showNewInventory(){connection.query('SELECT * FROM products'), function(error, results, fields){
        if (error) throw error;
        for (var i = 0; i < results.length; i++){
            //inquirer(prompt)
            console.log (//results[i].id + "|" + results[i].title + "|" + results[i].price + "|" + results[i].quantity)
            console.log ("===========================================")};
                };
               }; 
 //Prompt another purchase?
 connection.end(); 
