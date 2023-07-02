const readlineSync = require('readline-sync');

function getUsersPassword() {
    console.log('Enter a password and the program will calculate, how weak or strong the entered password is.');
    const usersPassword = readlineSync.question('Enter the password you would like evaluated: ');
    calcPasswordsScore(usersPassword);
}

function calcPasswordsScore(password) {
    let passwordScore = 0;
    let letterCheck = true;
    let numberCheck = false;
    let passwordShort = false; 
    let specialCharFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(specialCharFormat.test(password)) {
        passwordScore++;
    }
    let letterFormat = /[a-zA-Z]/;
    letterFormat.test(password) ? passwordScore++ : letterCheck = false;

    password.length >= 8 ? passwordScore++ : passwordShort = true;
    for(let i = 0; i < password.length; i++) {
        if (Number(password[i]) && numberCheck === false) {
            passwordScore ++;
            numberCheck = true;
        } 
    }
    function passwordValidator() {
        if (passwordScore === 1 && numberCheck === true) {
            ouputPasswordStrength(password, 'very weak');
        } else if (passwordScore === 1 && letterCheck === true || passwordShort === true) {
            ouputPasswordStrength(password, 'weak');
        } else if (passwordScore === 2) {
            ouputPasswordStrength(password, 'okay');
        } else if (passwordScore === 3) {
            ouputPasswordStrength(password, 'strong');
        } else if (passwordScore === 4) {
            ouputPasswordStrength(password ,'very strong');
        }
    }
    passwordValidator();
}

function ouputPasswordStrength(password, passwordStrength) {
    console.log(`The password "${password}" is a ${passwordStrength} password.`);
}

getUsersPassword();