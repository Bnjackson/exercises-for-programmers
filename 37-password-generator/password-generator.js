const readlineSync = require('readline-sync');

function getPasswordLength(callBack) {
    const userPasswordLength = Number(readlineSync.question('What length would you like the password to be? '));
    if (!isNaN(userPasswordLength)) {
        console.log(userPasswordLength);
        callBack(userPasswordLength);
    } else {
        console.log('Password length must be a number');
        getPasswordLength(callBack);
    }
}

function getNumSpecialChars(passwordInputs, callBack) {
    const userNumSpecialChars = Number(readlineSync.question('How many special characters would you like in your password? '));
    if (!isNaN(userNumSpecialChars) && userNumSpecialChars < passwordInputs.length) {
        callBack(userNumSpecialChars);
    } else {
        console.log('Number of special characters must be less than password length. Also must be a number.');
       getNumSpecialChars(passwordInputs, callBack);
    }
}

function getNumOfNums(passwordInputs, callBack) {
    const numOfNums = Number(readlineSync.question('How many numbers would you like in your password? '));
    if (!isNaN(numOfNums) && numOfNums + passwordInputs.specialChars < passwordInputs.length) {
        callBack(numOfNums);
    } else {
        console.log('Number of numbers must be less than number of password length - special characters. Also must be a number');
        getNumOfNums(passwordInputs, callBack);
    }
}

function generateNumbers(passwordInputs) {
    passwordInputs.password = '';
    for (let i = 0; i < passwordInputs.numbers; i++) {
        passwordInputs.password += Math.floor(Math.random() * 10);
    }
}

function generateSpecialChars(passwordInputs) {
    for (let i = 0; i < passwordInputs.specialChars; i++) {
        passwordInputs.password += String.fromCharCode(Math.floor(Math.random() * (48 - 33) + 33));
    }
}

function generateLetters(passwordInputs) {
    const numberOfLetters = passwordInputs.length - passwordInputs.password.length; 
    for (let i = 0; i < numberOfLetters ; i++) {
        const uppercaseOrLowercase = Math.round(Math.random());
        if (uppercaseOrLowercase) {
            passwordInputs.password += String.fromCharCode(Math.floor(Math.random() * (123 - 97) + 97));
        } else {
            passwordInputs.password += String.fromCharCode(Math.floor(Math.random() * (91 - 65) + 65));
        }
    }
}

function shufflePassword(password) {
    const passwordArr = password.split('');
    console.log(passwordArr);
    for (let i = passwordArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordArr[i], passwordArr[j]] = [passwordArr[j], passwordArr[i]];
    } 
    return passwordArr.join('');
}

function runProgram() {
    console.log('This program will generate a random password based on your inputs');
    let passwordInputs = {};
    getPasswordLength(result => passwordInputs.length = result); 
    getNumSpecialChars(passwordInputs, result => passwordInputs.specialChars = result);
    getNumOfNums(passwordInputs, result => passwordInputs.numbers = result);
    generateNumbers(passwordInputs);
    generateSpecialChars(passwordInputs);
    generateLetters(passwordInputs);
    console.log(passwordInputs.password);
    passwordInputs.password = shufflePassword(passwordInputs.password);
    console.log(`Your generated password is ${passwordInputs.password}`);
}

runProgram();