var art = require("ascii-art");
var mysql = require("mysql");
var Table = require("cli-table");

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

function executeQuery(sql, cb){
  db.query(sql, function(err, result){
    if (err) throw err;
    cb(result);
  })
}



art.font('Quarks Bamazon', 'Doom', function(rendered){
  console.log(rendered);
  console.log("Your source for legally sourced items from across the Federation.");
  console.log("All prices shown in Federation Credits.")
});

executeQuery('SELECT * from products', function(results){
  var table = new Table({
    head: ['Item ID', 'Prouct Name', 'Department Name', 'Price (C)', 'Quantity']
  });
  var allResults = [];

  for (var i = 0; i < results.length; i++){
    var theseResults = [];

    theseResults.push(results[i]["item_id"]);
    theseResults.push(results[i]["product_name"]);
    theseResults.push(results[i]["department_name"]);
    theseResults.push(results[i]["price"]);
    theseResults.push(results[i]["stock_quantity"]);

    allResults.push(theseResults);
  }
  for (var i = 0; i < allResults.length; i++){
    table.push(allResults[i]);
  }

  console.log(table.toString());
});