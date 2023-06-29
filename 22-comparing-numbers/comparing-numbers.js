const readlineSync = require('readline-sync');
const inputtedNums = [];

function getUserNums() {
    const userInput = Number(readlineSync.question('What number would you like to input? You cannot enter the same number twice '));
    function checkUserInput() {
        if(inputtedNums.includes(userInput)) {
            console.log('You have already entered the same number. Please enter a different number.');
            getUserNums();
        } else if (!isNaN(userInput)) {
            inputtedNums.push(userInput);
            return true;
        } else {
            console.log('Please enter numbers');
            getUserNums()
        }
    }
    if(checkUserInput()) {
        const addAnotherNumber = readlineSync.question('Do you want to add another number? Enter either "y" or "n" ').toLowerCase();
        addAnotherNumber === 'y' ? getUserNums() : calcHighestNum();
    }
}

function calcHighestNum() {
    let highestNum = 0;
    for(let i = 0; i < inputtedNums.length; i++) {
        if (inputtedNums[i] > highestNum) {
            highestNum = inputtedNums[i];
        }
    }
    outputHighestNum(highestNum)
}

function outputHighestNum(highestNum) {
    console.log(`The numbers you entered were ${inputtedNums} the highest number was ${highestNum}`);
}

getUserNums();