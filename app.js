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

const viewDepartments = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(res);
        startMenu();
        });
    };

    const viewRoles = () => {
        const query = 'SELECT * FROM role';
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log(res);
            startMenu();
            });
        };

        const viewEmployees = () => {
            const query = 'SELECT * FROM employee';
            connection.query(query, (err, res) => {
                if (err) throw err;
                console.log(res);
                startMenu();
                });
            };


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





connection.connect((err) =>{
    if(err) throw err;
    startMenu()
});