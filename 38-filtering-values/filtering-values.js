const readlineSync = require('readline-sync');

function getListOfNumbers(callback) {
    let usersList = readlineSync.question('Enter a list of numbers specified by spaces: ');
    usersList = usersList.split('');
    function checkUsersList() {
        for (let i = 0; i < usersList.length; i++) {
            if (i % 2 === 0 && isNaN(usersList[i])) {
                return false;
            } else if (i % 2 === 1 && usersList[i] !== ' ') {
                return false
            }
        }
        return true;
    }
    checkUsersList() ? callback(usersList) : getListOfNumbers(callback);
}

function getevenOrOdd(callback) {
    const userChoice = readlineSync.question('Would you like to filter the list down to only even or odd numbers. Enter "even" or "odd": ').toLowerCase();
    userChoice === 'odd' || userChoice === 'even' ? callback(userChoice) : getevenOrOdd(callback);
}

function getFilteredList(list, evenOrOdd) {
    let filteredList = [];
    for (let i = 0; i < list.length; i++) {
        if (evenOrOdd === 'even' && list[i] % 2 === 0) {
            addSpacesToList();
            filteredList.push(list[i]);
        } else if (evenOrOdd === 'odd' && list[i] % 2 === 1) {
            addSpacesToList();
            filteredList.push(list[i]);
        }
    }
    function addSpacesToList() {
        if (filteredList.length !== 0) {
            filteredList.push(' ');
        }
    }
    return filteredList.join('');
}

function runProgram() {
    let listOfNumbers;
    let evenOrOdd;
    getListOfNumbers(callback = result => listOfNumbers = result);
    getevenOrOdd(callback = result => evenOrOdd = result);
    listOfNumbers = listOfNumbers.filter(element => element !== ' ');
    const filteredList =  getFilteredList(listOfNumbers, evenOrOdd);
    console.log(`The ${evenOrOdd} numbers are ${filteredList}`);
}

runProgram();