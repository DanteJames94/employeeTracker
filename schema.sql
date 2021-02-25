DROP DATABASE IF EXISTS employee_tracker;


CREATE DATABASE employee_tracker;


USE employee_tracker;

CREATE TABLE departments (
  id int AUTO_INCREMENT NOT NULL,
  name varchar(30) NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO departments (name) VALUES ("Operations");
INSERT INTO departments (name) VALUES ("Human Resources");
INSERT INTO departments (name) VALUES ("Business Development");


CREATE TABLE role (
    id int AUTO_INCREMENT NOT NULL, 
    title varchar(30), 
    salary decimal, 
    department_id int,
    PRIMARY KEY(id)
);

INSERT INTO role (title, salary, department_id) VALUES ("CEO", 300000.00, "01");
INSERT INTO role (title, salary, department_id) VALUES ("Director", 100000.00, "02");
INSERT INTO role (title, salary, department_id) VALUES ("VP", 250000.00, "03");


CREATE TABLE employees (
    id int AUTO_INCREMENT NOT NULL, 
    first_name varchar(30),
    last_name varchar(30),
    role_id int, 
    manager_id int,
    PRIMARY KEY(id)
);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Dante", "James", 777, 10);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Erika", "Salcido", 808, 10);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Richard", "Ramirez", 303, 10);

