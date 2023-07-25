'use strict';

const readlineSync = require('readline-sync');

let employeeRecords = [
    {'First Name' : 'John',
    'Last Name' : 'Johnson', 
    'Position' : 'Manager', 
    'Seperation Date' : '2016-12-31'},

    {'First Name' : 'Tou', 
    'Last Name' : 'Xiong', 
    'Position' : 'Software Engineer',
    'Seperation Date' : '2016-10-05'},

    {'First Name' : 'Michaela', 
    'Last Name' : 'Michaelson', 
    'Position' : 'District Manager', 
    'Seperation Date' : '2015-12-19'},

    {'First Name' : 'Jake', 
    'Last Name' : 'Jacobson', 
    'Position' : 'Programmer', 
    'Seperation Date' : ''},

    {'First Name' : 'Jacquelyn', 
    'Last Name' : 'Jackson', 
    'Position' : 'DBA', 
    'Seperation Date' : ''},

    {'First Name' : 'Sally', 
    'Last Name' : 'Weber', 
    'Position' : 'Web Developer', 
    'Seperation Date' : '2015-12-18'},
];

function getSortingType(callback) {
    const correctChoices = ["First Name", "Last Name", "Position"];
    const userChoice = readlineSync.question('How would you like to sort the records, by "First Name", "Last Name", or "Position"');
    if (correctChoices.includes(userChoice)) {
        callback(userChoice);
    } else {
        console.log(`${userChoice} is not a correct choice`);
        getSortingType(callback);
    }
}

function sortEmployeeRecords(records, key) {
    return records.sort((a, b) => {
        const nameA = a[key];
        const nameB = b[key];
        if (nameA < nameB) {
            return -1;
        } else if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}

function runProgram() {
    console.log(employeeRecords);
    console.log('This program allows you to sort the employee records.');
    let sortingType;
    getSortingType(result => sortingType = result);
    const sortedEmployeeRecords =  sortEmployeeRecords(employeeRecords, sortingType);
    console.log(sortedEmployeeRecords );
}

runProgram()