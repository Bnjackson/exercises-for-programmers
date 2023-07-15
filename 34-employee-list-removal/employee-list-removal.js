const readlineSync = require('readline-sync');

function getEmployeeToRemove(employees) {
    const userInput = readlineSync.question('Which employee from the list do you wish to remove? ');
    if (employees.includes(userInput)) {
        return userInput;
    } else {
        console.log(`${userInput} could not be found in the system. Please enter a user that is in the list.`);
        getEmployeeToRemove(employees);
    }
}

function outputUpdatedEmployees(employees) {
    console.log(`The updated employee count is ${employees.length} and the employees are...`);
    console.log(employees);
}

function runProgram() {    
    let employees = ['John Smith', 'Jackie Jackson', 'Chris Jones', 'Amanda Cullen', 'Jeremy Goodwin'];
    console.log(`This program prompts for which employee you wish to remove from the employee list. The employee count is ${employees.length} and the employees are....`);
    console.log(employees);
    const employeeToRemove = getEmployeeToRemove(employees);
    employees.shift(employeeToRemove);
    outputUpdatedEmployees(employees);
}

runProgram()