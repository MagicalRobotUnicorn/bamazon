DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price FLOAT(20, 2) NOT NULL,
  stock_quantity INT(100) NOT NULL,
  product_sales FLOAT(100,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (item_id)
);

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs FLOAT(20, 2) NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments(department_name, over_head_costs)
VALUES ("Weapons", 15000);

INSERT INTO departments(department_name, over_head_costs)
VALUES ("Engineering", 10000);

INSERT INTO departments(department_name, over_head_costs)
VALUES ("Medical", 7500);

INSERT INTO departments(department_name, over_head_costs)
VALUES ("General", 8000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Starfleet Phaser", "Weapons", "100.00", 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Starfleet Replicator", "General", "700.00", 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Engineering Tricorder", "Engineering", "75.50", 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Engineering Kit", "Engineering", "85.00", 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Quantum Spanner", "Engineering", "100.00", 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Standard Terminal", "General", "100.00", 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Medical Tricorder", "Medical", "85.00", 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dermal Regenerator", "Medical", "600.00", 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Photon Torpedo", "Weapons", "15000.00", 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ECHO PaPa 607 Killer Droid", "Weapons", "20000.00", 2);