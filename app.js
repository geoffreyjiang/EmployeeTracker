const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employeeDB",
});

const startMenu = () => {
    inquirer.prompt({
        name: "mainMenu",
        type: "list",
        message: "What Would You Like To Do?",
        choices: [
            'View Deparments',
            'View Roles',
            'View Employees',
            'Add Department',
            'Add Role',
            'Add Employee'
        ]
    }).then((res) =>{
        switch (res.mainMenu){
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
        startMenu();
    });
}

function viewRoles() {
    const query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startMenu();
        });
}

function viewEmployees() {
    const query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startMenu();
    });
}

const addDepartment = () => {
    inquirer.prompt({
        name: "addDept",
        type: "input",
        message: "Enter Department Name",
    }).then((res) => {
        connection.query("INSERT INTO department SET ?",{name: res.addDept},
            (err, res) => {
            if (err) throw err
            console.table(res)
            startMenu()
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
            startMenu();
        })
    })
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "fName",
            message: "Enter First Name"
        },
        {
            type: "input",
            name: "lName",
            message: "Enter Last Name"
        },
        {
            type: "input",
            name: "roleId",
            message: "Enter Role ID"
        }
    ]).then((res) => {
        const query = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${res.fName}', '${res.lName}', '${res.roleId}')`
        connection.query(query, function(err, res){
            if (err) throw err;
            startMenu()
        })
    })
}

connection.connect((err) =>{
    if(err) throw err;
    startMenu()
});