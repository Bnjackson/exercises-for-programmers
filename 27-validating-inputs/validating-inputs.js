const readlineSync = require('readline-sync');

function checkFirstAndLastName(firstName, lastName) {
    if (firstName && lastName) {
        if (firstName.length > 2 && lastName.length > 2) {
            if(/^[a-zA-Z]+$/.test(firstName) && /^[a-zA-Z]+$/.test(lastName)) {
                return true;
            } else {
                console.log('!!! Your first name and last name must only contain letters')
            }
        } else {
            console.log('!!! Firstname and lastname inputs must be longer 2 characters');
        }
    } else {
        console.log('!!! You must enter a value for your first name and last name inputs');
    }
}

function checkEmployeeId(id) {
    if (id.length === 7) {
        for (let i = 0; i < id.length; i++) {
            if (i <= 1 && id[i].toUpperCase() === id[i].toLowerCase()) {
                return false;
            } else if (i === 2 && id[i] !== '-') {
                return false;
            } else if (i >= 3 &&  !Number(id[i])) {
                return false;
            }
        }
    } else {
        return false;
    }
    return true;
}

function checkZipCode(zipCode) {
    return Number(zipCode);
}

function validateInputs() {
    const firstName = readlineSync.question('What is your first name? ');
    const lastName = readlineSync.question('What is your last name? ');
    if (checkFirstAndLastName(firstName, lastName)) {
        const employeeId = readlineSync.question('What is your employee ID? ');
        if(checkEmployeeId(employeeId)) {
            const zipCode = readlineSync.question('What is your ZIP code? ');
            checkZipCode(zipCode) ? outputValidUser(zipCode, employeeId) : console.log('!!! The zip code must be a number');
        } else {
            console.log('!!! The format for the employee ID is "AA-1234"');
            validateInputs();
        }
    } else {
        validateInputs();
    }
    function outputValidUser(zipCode, employeeId) {
        console.log(`All your inputs are valid: ${firstName}, ${lastName}, ${employeeId}, ${zipCode}`);
    }
}

validateInputs();