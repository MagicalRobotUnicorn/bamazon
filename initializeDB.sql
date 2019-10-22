DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price FLOAT(20, 2) NOT NULL,
  stock_quantity INT(100) NOT NULL,
  PRIMARY KEY (item_id)
);

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