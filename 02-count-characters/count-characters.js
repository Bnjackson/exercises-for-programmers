const readlineSync = require('./node-modules/readline-sync');

const userInput = readlineSync.question('What is the input string?');

function checkString(string) {
    if (!string) {
        console.log('Please enter a non empty string');
    }  else {
        console.log(`Your string is "${string}" and it has ${string.length} characters.`);
    }
}

checkString(userInput);