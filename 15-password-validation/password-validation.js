"use strict";
const readlineSync = require('readline-sync');
const bcrypt = require('bcryptjs');
const userAccounts = new Map();

function createAccountOrLogin() {
    const userChoice = readlineSync.question('Would you like to create an account or login to an existing account? Input either \"create\" or \"login"\ ');
    if(userChoice.toLowerCase() === 'create') {
        getUserName();
    } else if (userChoice.toLowerCase() === 'login') {
        userNameLogin();
    } else {
        console.log('Please enter a correct input. Either \"create\" or \"login\"'); 
        createAccountOrLogin();
    }
}

function getUserName() {
    let userName = readlineSync.question('What would you like your username to be? ');
    if (checkUserName(userName)) {
        getUserPassword(userName);
    } else {
        console.log('Sorry that userName is taken.')
        getUserName();
    }
    function checkUserName (userName) {
        for (let keys of userAccounts.keys()) {
            if (userName === keys) {
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

function getUserPassword(userName) {
    let userPassword = readlineSync.question('Please enter your account password? ');
    async function hashPassword () {
        //Function is using async/await to give the hashing process time to complete, otherwise password would be a promise.
        const numSaltRounds = 10;
        try {
            userPassword = await bcrypt.hash(userPassword, numSaltRounds);
            userAccounts.set(userName, userPassword);
            createAccountOrLogin();
        } catch (error) {
            console.error('Error hashing password:', error);
        }
    }
    hashPassword();
}

function userNameLogin() {
    let userNameFound = false; 
    const userNameInput = readlineSync.question('Please enter your accounts username: ');
    for (let keys of userAccounts.keys()) {
        if(userNameInput === keys) {
            userNameFound = true;
            passwordLogin(userAccounts.get(keys));
        }
    }
    if(!userNameFound) {
        console.log('Username is not found. Please try again')
        createAccountOrLogin();
    }
    function passwordLogin(hash) {
        const userPasswordAttempt = readlineSync.question('Please enter your accounts password: ');
        if(bcrypt.compare(userPasswordAttempt, hash)) {
            //Compares user submitted password to the hashed password stored in map. Method returns a boolean whether or not password matches to hash.
            loggedInMessage();
        } else {
            console.log('The password entered is incorrect, please try again.')
            passwordLogin(hash);
        }
    }
}

function loggedInMessage() {
    console.log('Congrats you have logged in');
    console.log(`
     _   _      _ _         _    _            _     _ _ 
    | | | |    | | |       | |  | |          | |   | | |
    | |_| | ___| | | ___   | |  | | ___  _ __| | __| | |
    |  _  |/ _ \\ | |/ _ \\  | |/\\| |/ _ \\ | '__| |/ _\\\` | |
    | | | |  __/ | | (_) | \\  /\\  / (_) | |  | | (_| |_|
    \\_| |_/\\___|_|_|\\___/   \\/  \\/ \\___/|_|  |_|\\__,_(_)
    
    `);
}




createAccountOrLogin();