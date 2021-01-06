DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE department (
	id INT AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE role (
	id INT AUTO_INCREMENT NOT NULL,
	title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
	PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
	id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (name)
VALUES ("Management"), ("Finance"), ("Starter"), ("Bench"), ("Coach");

INSERT INTO role (title, salary, department_id)
VALUES ("GM", 600000, 1), ("CFO", 500000, 2), ("QB", 450000,3), ("BackupQB", 250000, 4), ("headCoach", 350000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Ron", "Cinch", 1), ("Scotty", "Tapatio", 2), ("Timmy", "Geronimo", 3), ("Rick", "Cullens", 4), ("Mile", "Manahan", 5);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
