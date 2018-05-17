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

    connection.query('SELECT *  FROM products', function (error, results) {
        if (error) throw error;
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

showInventory();

//Takes Items from Inventory for Prompt
var data= [];
var dataID;

function selectedChoices() {
    connection.query('SELECT item_id, product_name, stock_quantity  FROM products', function (error, results) {
        if (error) throw error;
        //console.log(results)
        results.map(result => {
            data.push( {
                item_id: result.item_id,
                stock_quantity: result.stock_quantity,
            })
        })
        
        console.log("data", data)

        dataID = data.map(element => {
            console.log("dataID", element.item_id)
        });

        var dataStock =data.forEach(element => {
            console.log("dataStock", element.stock_quantity)
        });


        var product = data.find(p => p.item_id === 1);
        console.log("product", product)

        //ShopList choices
        

        
        choicesPrompt();
    });

};

//First Prompt to Allow User to Pick Items to purchase
function choicesPrompt() {
    inquirer.prompt([
        {
            type: 'checkbox',
            name: 'shopList',
            message: 'What are you purchasing?',
            choices: something
        }

    ])
        .then(answers => {
            console.log("answers.shoplist", answers.shopList)
            // var cart = answers.shopList.find(p => p.item === answers.shopList.item)
            console.log('You have in your Cart: \n')

            answers.shopList.forEach(item => {
                console.log(`Item ID:${item}\n`)

            })
            //Checks quantity of stock of selectedChoices

            function quantityPrompt() {
                //Second prompt for Quantity Check
                var count = 0;
                //value to match stock quantity
                

                if (count < answers.shopList.length) {

                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'howMany',
                            message: 'How many would you like to purchase?',
                            validate: function (value) {
                                var pass = value.match(
                                    /\d/gm
                                );
                                if (pass) {
                                    //check quantity
                                    if (Number(value) < 15 ) {
                                        console.log('Sufficient Quanity purchase made')
                                    return true;
                                    }
                                    else {
                                        console.log('\nInsufficient Quantity, Please Change Your Quantity')
                                    return false;
                                    }

                                }
                                console.log("Please enter a valid number")
                                return false;
                            }
                        }
                    ])
                        .then(answers => {
                            console.log(answers)
                            count++;
                            console.log(count)
                            quantityPrompt();
                        })
                }
            }
            quantityPrompt();

        });
}

selectedChoices();

function updateChoices() {
    connection.query('UPDATE stock_quantity FROM products WHERE item_id =? ', function (error, results) {
        if (error) throw error;
        //console.log(results)
        //command to subtract quantity from purchased amounts
        //showInventory();
    });

};

 connection.end(); 