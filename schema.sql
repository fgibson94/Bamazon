drop database if exists bamazon_db;
create database bamazon_db;

use bamazon_db;

create table products(
item_id integer auto_increment not null,

product_name varchar(50),

department_name varchar(50),

price integer ,

stock_quantity integer,

primary key (item_id)

);

use bamazon_db;

ALTER TABLE products
MODIFY price decimal (5,2);

ALTER TABLE products
ADD COLUMN isSelected BOOLEAN NOT NULL