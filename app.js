const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host = "localhost",
    port = 3306,
    user = "root",
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
            'Add Roles',
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



// * Add departments, roles, employees

// * View departments, roles, employees









connection.connect((err) =>{
    if(err) throw err;
    startMenu()
});