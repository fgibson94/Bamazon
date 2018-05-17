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

//CREATE
connection.connect();

var data = [];
function showInventory() {
    //pulls table from database formatting for shopping
    connection.query('SELECT * FROM products', function (error, results) {
        if (error) throw error;
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

        results.map(result => {
            data.push({
                name: result.item_id,
                value: result.stock_quantity,
                short: result.product_name
            })
        })
        //console.log('data', data)
        ask();
    });
    //connection.end()
};
showInventory();
console.log('here', data)
//READ

var choicesPrompt = [
    {
        type: 'checkbox',
        name: 'shopList',
        message: 'What are you purchasing?',
        choices: data,
        // filter: function (val) {
        //     return val[0];
        // }
    }
];
var quantityPrompt = [
    {
        type: 'input',
        name: 'howMany',
        message: 'How many units would you like to purchase?',
        validate: function (val) {
            var pass = val.match(/\d/gm);
            if (pass) {
                // if (val < 15) {
                //     console.log(', Sufficient Quantity, purchase made');
                //     return true;
                // }
                // else {
                //     console.log('\nInsufficient Quantity, Please Change Amount')
                //     return false;
                // }
                return true;
            }
            else {
                console.log('\nPlease enter a valid number')
                return false;
            }
        }
    }
]
var count = 1;
var cart = [];
function ask() {
    inquirer.prompt(choicesPrompt).then(answers => {
        console.log(data);

        console.log('Quantity', answers.shopList);
        var stockQuantity = answers.shopList;

        function check() {
            inquirer.prompt(quantityPrompt).then(answers => {

                var selectedQuantity = answers.howMany
                if (count < stockQuantity.length) {

                    console.log('howMany', selectedQuantity);
                    count++;
                    console.log(count);
                    check();

                    function validate(x, y) {
                        console.log("X" + x, "Y" + y)
                        if (parseFloat(x) > parseFloat(y)) {

                            console.log('Insufficient Quantity, select a smaller amount');
                            check();
                        }
                        else {
                            console.log('Added to Cart');

                        }
                    }
                    for (var i = 0; i < stockQuantity.length; i++) {
                        console.log(stockQuantity.find(p => p.value = stockQuantity[i]))
                        
                    }
                    //    validate(selectedQuantity, p)

                }
                else {
                    console.log("Done")
                }

            });
        }
        check();
    })

}


//ask();
//UPDATE

//DELETE


