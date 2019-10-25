// * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

// * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

// * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

// * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

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

async function executeQuery(sql) {
  var promise1 = new Promise(function(resolve, reject){
    db.query(sql, function (err, result) {
      if (err)  {
        reject(err)
      }
      resolve(result);
    })
  });
  return promise1;
}

async function displayTable(results) {
  console.log('inside table');
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

art.font('Quarks Bamazon', 'Doom', function (rendered) {
  console.log(rendered);
  console.log("Welcome to the managers view of Quark's Bamazon.");
  console.log("All prices shown in Federation Credits.")
});

async function management(){
  // art.font('Quarks Bamazon', 'Doom', function (rendered) {
  //   console.log(rendered);
  //   console.log("Welcome to the managers view of Quark's Bamazon.");
  //   console.log("All prices shown in Federation Credits.")
  // });
  // let queryData = await executeQuery('SELECT * from products');
  // displayTable(queryData);

  // Inquierer main menu
  inquirer
  .prompt({
    name: "menuItems",
    type: "list",
    message: "What menu item would you like to execute?",
    choices: ["View Items for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
  })
  .then(async function(answer) {
    if (answer.menuItems === "View Items for Sale"){
      let queryData = await executeQuery('SELECT * from products');
      displayTable(queryData);
      management();
    }
    else if (answer.menuItems === "View Low Inventory"){
      db.query('SELECT * from products WHERE stock_quantity<=6'
      , async function(error, queryData) {
        console.log("Got here...");
        displayTable(queryData);
        management();
      });
    }
    else if (answer.menuItems === "Add to Inventory"){
      let queryData = await executeQuery('SELECT * from products');
      displayTable(queryData);
    }
    else if (answer.menuItems === "Add New Product"){
      inquirer
      .prompt([
      {
        name: "product_name",
        type: "input",
        message: "What is the name of the product?"
      },
      {
        name: "department_name",
        type: "input",
        message: "What department will this be filed under?"
      },
      {
        name: "price",
        type: "input",
        message: "What price will the item sell for?"
      },
      {
        name: "stock_quantity",
        type: "input",
        message: "How many of this item will be in stock?"
      }

    ]).then(function (answer) {

      db.query(`insert into products (product_name, department_name, price, stock_quantity) values ("${answer.product_name}", "${answer.department_name}", ${answer.price}, ${answer.stock_quantity})`, function(error, result){
                  console.log("Error: ", error);
                  console.log("Result: ", result);
                });
    }
    );
}
  }
  );
}

management();