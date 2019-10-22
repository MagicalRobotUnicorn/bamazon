var art = require("ascii-art");
var mysql = require("mysql");
var Table = require("cli-table");
var inquirer = require("inquirer");

var db = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Pa$$w0rd",
  database: "bamazon"
});

async function executeQuery(sql, cb) {
  db.query(sql, function (err, result) {
    if (err) throw err;
    cb(result);
  })
}

async function displayTable(results) {
  var table = new Table({
    head: ['Item ID', 'Prouct Name', 'Department Name', 'Price (C)', 'Quantity']
  });
  var allResults = [];

  for (var i = 0; i < results.length; i++) {
    var theseResults = [];

    theseResults.push(results[i]["item_id"]);
    theseResults.push(results[i]["product_name"]);
    theseResults.push(results[i]["department_name"]);
    theseResults.push(results[i]["price"]);
    theseResults.push(results[i]["stock_quantity"]);

    allResults.push(theseResults);
  }
  for (var i = 0; i < allResults.length; i++) {
    table.push(allResults[i]);
  }

  await console.log(table.toString());

}

function shopping() {
  
  // var promise1 = new Promise(function(resolve, reject) {
  //   art.font('Quarks Bamazon', 'Doom', function (rendered) {
  //     console.log(rendered);
  //     console.log("Your source for legally sourced items from across the Federation.");
  //     console.log("All prices shown in Federation Credits.")
  //   });
  //   executeQuery('SELECT * from products', displayTable);
  // });
  
  // promise1.then(
    
  
  

  art.font('Quarks Bamazon', 'Doom', function (rendered) {
    console.log(rendered);
    console.log("Your source for legally sourced items from across the Federation.");
    console.log("All prices shown in Federation Credits.")
  });
  executeQuery('SELECT * from products', displayTable);

  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What Item ID would you like to order?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to order?"
      }
    ]).then(function (answer) {
      db.query(
        "SELECT * FROM products WHERE ?",
        [
          {
            item_id: answer.item
          }
        ], function (error, result) {
          if (result.length > 0) {
            displayTable(result);
            if (result[0]["stock_quantity"] >= answer.quantity) {
              var orderTotal = String(result[0]["price"] * answer.quantity);
              var orderQuantity = answer.quantity;
              inquirer
                .prompt({
                  name: "confirmPurchase",
                  type: "list",
                  message: "The total for your order is " + orderTotal + " credits... proceed?",
                  choices: ["YES", "NO"]
                })
                .then(function (answer) {
                  if (answer.confirmPurchase === "YES") {
                    console.log("Great.. we will charge your account " + orderTotal + " credits and have that sent to your quarters.");
                    db.query('UPDATE PRODUCTS SET ? WHERE ?',[
                      {
                        stock_quantity: result[0]["stock_quantity"] - orderQuantity
                      },
                      {
                        item_id: result[0]["item_id"]
                      }
                    ], function(error, result){
                      shopping();
                    })
                  }
                  else if (answer.confirmPurchase === "NO") {
                    console.log("Sorry to hear that");
                    shopping();
                  }
                });
            }
          }
        })
    }));
}


shopping();