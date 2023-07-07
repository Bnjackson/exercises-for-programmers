const readlineSync = require('readline-sync');

function getUserNumbers() {
    function checkIfNumber(num) {
        return num;
    }
    function calculateTotal() {
        let total = 0;
        for(let i = 0; i < userNumbers.length; i++) {
            total += userNumbers[i];
        }
        console.log(`The total of all inputted numbers is ${total} and the inputted numbers are ${userNumbers}`);
    }
    let userNumbers = [];
    console.log('This program will add together all inputted numbers')
    const numberOfNumbers = Number(readlineSync.question('How many numbers would you like to input? '));
    console.log(checkIfNumber(numberOfNumbers));
    if (checkIfNumber(numberOfNumbers)) {
        for(let i = 0; i < numberOfNumbers; i++) {
            const userNumber = Number(readlineSync.question(`What is number ${i + 1} of ${numberOfNumbers}? `));
            if (checkIfNumber(userNumber)) {
                userNumbers.push(userNumber);
            } else  { 
                console.log('!!! All inputs must be numbers');
                break;
            }
        }
        userNumbers.length === numberOfNumbers ? calculateTotal() : getUserNumbers();
    } else {
        console.log('Input must be a number');
        getUserNumbers();
    }

}

getUserNumbers();