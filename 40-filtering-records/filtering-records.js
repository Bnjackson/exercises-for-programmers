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

function getUserSearchChoice(callback) {
    const usersInput = readlineSync.question('Would you like to search by "name" or by "position"? ').toLowerCase();
    if (usersInput === 'name' || usersInput === 'position') {
        callback(usersInput)
    } else {
        console.log('You must input either "name" or "position".');
        getUserSearchChoice(callback);
    }
}

function getUsersSearch() {
    return readlineSync.question('What would you like to search the employees record for? ');
}

function searchEmployeeRecords(usersSearch, userSearchChoice) {
    let keys = getKeys();
    let filteredEmployeeRecords = [];
    for (let i = 0; i < employeeRecords.length; i++) {
        for (let j = 0; j < keys.length; j++) {
            console.log(employeeRecords[i][keys[j]]);
            if (employeeRecords[i][keys[j]].includes(usersSearch)) {
                filteredEmployeeRecords.push(employeeRecords[i]);
                j = keys.length;
            }
        }
    }
    function getKeys() {
        if (userSearchChoice === 'name') {
            return ['First Name', 'Last Name'];
        } else {
            return ['Position'];
        }
    }
    return filteredEmployeeRecords;
}

function runProgram() {
    console.log(employeeRecords)
    console.log('This program allows you to search through the employee records.');
    let userSearchChoice;
    getUserSearchChoice(usersChoice => userSearchChoice = usersChoice);
    const usersSearch = getUsersSearch();
    console.log(searchEmployeeRecords(usersSearch, userSearchChoice));
}

runProgram();