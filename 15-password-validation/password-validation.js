"use strict";
const readlineSync = require('readline-sync');
const bcrypt = require('bcryptjs');
const userAccounts = new Map();

function createAccountOrLogin() {
    const userChoice = readlineSync.question('Would you like to create an account or login to an existing account? Input either \"create\" or \"login"\ ');
    if(userChoice.toLowerCase() === 'create') {
        getUserName();
    } else if (userChoice.toLowerCase() === 'login') {

    } else {
        console.log('Please enter a correct input. Either \"create\" or \"login\"'); 
        createAccountOrLogin();
    }
}

function getUserName() {
    let userName = readlineSync.question('What would you like your username to be? ');
    if (checkUserName(userName)) {
        getUserPasswordAndHash(userName);
    } else {
        console.log('Sorry that userName is taken.')
        getUserName();
    }
    function checkUserName (userName) {
        for (let keys of userAccounts.keys()) {
            if (userName === userAccounts[keys]) {
                console.log(userName, userAccounts[keys]);
                return false;
            } else {
                return true;
            }
        }
        if(userAccounts.size === 0) {
            return true;
        }
    }
}







createAccountOrLogin();