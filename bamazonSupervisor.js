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
  var promise1 = new Promise(function (resolve, reject) {
    db.query(sql, function (err, result) {
      if (err) {
        reject(err)
      }
      resolve(result);
    })
  });
  return promise1;
}

async function displayTable(results) {
  var table = new Table({
    head: ['Department ID', 'Department Name', 'Overhead Cost', 'Total Sales']
  });
  var allResults = [];

  for (var i = 0; i < results.length; i++) {
    var theseResults = [];

    theseResults.push(results[i]["department_id"]);
    theseResults.push(results[i]["department_name"]);
    theseResults.push(results[i]["over_head_costs"]);
    if (results[i]["total_sales"] === null){
      theseResults.push(0 - results[i]["over_head_costs"]);
    }
    else {
      theseResults.push(results[i]["total_sales"]);
    }

    allResults.push(theseResults);
    table.push(theseResults);
  }

  await console.log(table.toString());

}

async function supervisor() {
  inquirer
    .prompt({
      name: "menuItems",
      type: "list",
      message: "What menu item would you like to execute?",
      choices: ["View Product Sales by Department", "Create New Department"]
    })
    .then(async function (answer) {
      if (answer.menuItems === "View Product Sales by Department") {
        let queryData = await executeQuery('SELECT departments.department_id, departments.department_name, departments.over_head_costs, (SUM(products.product_sales) - departments.over_head_costs) AS total_sales FROM departments LEFT JOIN products ON departments.department_name=products.department_name GROUP BY department_id');
        displayTable(queryData);
        supervisor();
      }
      else if (answer.menuItems === "Create New Department") {
        inquirer
          .prompt([
            {
              name: "department_name",
              type: "input",
              message: "What is the department name?"
            },
            {
              name: "over_head_cost",
              type: "input",
              message: "What is the over head cost of the department?"
            }]).then(async function (answer) {
              db.query(`insert into departments (department_name, over_head_costs) values ("${answer.department_name}", ${answer.over_head_cost})`, function (error, result) {
                if (error) { console.log(error); }
                console.log("Success!");
                supervisor();
              });
            });
      }

    });
}



supervisor();