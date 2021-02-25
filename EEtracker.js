const inquirer = require('inquirer')
const mysql = require('mysql')
const table = require('console.table')
const logo = require('asciiart-logo');


var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user:"root",
    password: "Revolution94!",
    database:"employee_tracker"
});




function start() {
  const banner = logo({ name: "Employee Manager" }).render();
  
  console.log(banner);
  questionStart();
  }

  const questionStart = function() {
    inquirer.prompt ([
        { 
            name: "questionStart",
            type: "list", 
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Departments", "View All Roles","Add Employee","Add Department", "Add Role", "Update Employee Role", "Exit"]
        }
        ])
        .then(answer => {
            switch (answer.questionStart) {
              case "View All Employees":
                  //callback from "View All Employees"
                break;
              case "View All Departments":
                  viewDepartments();
                break;
              case "View All Roles":
                  //callback from "View All Employees"
                break;
              case "Add Employee":
                  //callback from "View All Employees"
                break;
              case "Add Department":
                  addDepartment();
                break;
              case "Add Role":
                  //callback from "View All Employees"
                break;
              case "Update Employee Role":
                  updateEmployeeRole();
                break;
            
              default: 

              connection.end();
                break;
            }

        })
  }


  function viewDepartments() {
    connection.query('SELECT * FROM departments', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      questionStart();
    });
  }

  function addDepartment() {
    inquirer.prompt ([
      { 
          name: "departments",
          type: "input", 
          message: "What department would you like to add?",
          
      }
    ])
    .then(answer => {
     connection.query(
        'INSERT INTO departments SET ?',
        {
          name: answer.departments,
          
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} Department Added!\n`);
          
          questionStart();
        }
      );

    })
  }

  function updateEmployeeRole () {
    connection.query("SELECT * FROM role", (err, res) => {
      if (err) throw err;
      const role2 = res.map(role => ({
        name: role.title, 
        value: role.id, 

      }));
      connection.query("SELECT * FROM employees", (err, res) => {
        const employees2 = res.map(employee => ({
          name: `${employee.first_name} ${employee.last_name}`, 
          value: employee.id,
        }))
          inquirer.prompt([
            {
              name: "employee",
              type: "list",
              message: "What employee would you like to update?",
              choices: employees2, 
            },
            {
              name: "newRole",
              type: "list",
              message: "What is the new role you'd like to give the employee?",
              choices: role2, 

            }

          ])
          .then(answer => {
            connection.query(
              'UPDATE employees SET ? WHERE ?',
              [
                {
                  role_id: answer.newRole,
                },
                {
                  id: answer.employee,
                },
              ],
              (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} Roles updated!\n`);
                // Call deleteProduct AFTER the UPDATE completes
                questionStart();
              }
            );
          })
      })
    }

    )
  }








connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
});
    