const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employeeDB",
});

const mainMenu = () => {
    inquirer.prompt({
        name: "menu",
        type: "list",
        message: "What Would You Like To Do?",
        choices: [
            'View Departments',
            'View Roles',
            'View Employees',
            'Add Department',
            'Add Role',
            'Add Employee'
        ]
    }).then((res) =>{
        switch (res.menu){
            case 'View Departments':
                viewDepartments()
                break;
            case 'View Roles':
                viewRoles()
                break;            
            case 'View Employees':
                viewEmployees()
                break;            
            case 'Add Department':
                addDepartment()
                break;            
            case 'Add Role':
                addRole()
                break;            
            case 'Add Employee':
                addEmployee()
                break;            
        }
    })
}

function viewDepartments() {
    const query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function viewRoles() {
    const query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
        });
}

function viewEmployees() {
    const query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

const addDepartment = () => {
    inquirer.prompt({
        name: "addDept",
        type: "input",
        message: "Enter Department Name",
    }).then((res) => {
        const query = `INSERT INTO department (name) VALUES ('${res.addDept}')`;
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.table(res)
            mainMenu();
        })
        })
    }


const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "newRole",
            message: "Enter Role"
        },
        {
            type: "input",
            name: "roleSal",
            message: "Enter Salary"
        },
        {
            type: "input",
            name: "deptId",
            message: "Enter Department ID"
        }
    ]) .then((res) => {
        const query = `INSERT INTO role (title, salary, department_id) VALUES ('${res.newRole}', '${res.roleSal}', '${res.deptId}')`;
        connection.query(query, function (err,res){
            if (err) throw err;
            console.table(res);
            mainMenu();
        })
    })
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "first",
            message: "Enter First Name"
        },
        {
            type: "input",
            name: "last",
            message: "Enter Last Name"
        },
        {
            type: "input",
            name: "roleId",
            message: "Enter Role ID"
        }
    ]).then((res) => {
        const query = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${res.first}', '${res.last}', '${res.roleId}')`
        connection.query(query, function(err, res){
            if (err) throw err;
            console.table(res);
            mainMenu();
        })
    })
}

connection.connect((err) =>{
    if(err) throw err;
    mainMenu();
});