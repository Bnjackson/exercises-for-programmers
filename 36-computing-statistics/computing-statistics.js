'use strict';
const readlineSync = require('readline-sync');

function getUserNumbers(numbers) {
    let userInput = '';
    while (userInput !== 'done') {
        userInput = readlineSync.question('Enter a number? ');
        if(checkUserInput()) {
            numbers.push(userInput);
        }
    }
    function checkUserInput() {
        if (userInput === 'done' && numbers.length < 5) {
            console.log('You must enter at least 5 numbers before the program can calculate the statistics.');
            userInput = 'notDone';
            return false;
        } else if (Number(userInput)) {
            userInput = Number(userInput);
            return true;
        } else if (userInput !== 'done') {
            console.log('User inputs must be numbers or "done" when you want to stop entering numbers.');
            return false;
        }
    }
}

function calcMean(arr) {
    return arr.reduce((sum, num) => sum += num, 0) / arr.length;
}

function calcMin(arr) {
    arr = arr.sort((a, b) => a - b);
    return arr[0];
}

function calcMax(arr) {
    return arr[arr.length - 1];
}

function calcStandardDeviation(mean, arr) {
    const squaredDifferences = arr.map((num) => Math.pow(num - mean, 2));
    const meanSquaredDifferences = squaredDifferences.reduce((sum, squaredDiff) => sum + squaredDiff, 0) / arr.length;
    const standardDeviation = Math.sqrt(meanSquaredDifferences);
    return standardDeviation;
}

function outputStatistics(arr, mean, min, max, standardDeviation) {
    console.log(`The numbers you submitted were ${arr}`);
    console.log(`The mean of the numbers is : ${mean}, the minimum number is : ${min}, the maximum is : ${max}, and the standard deviation is : ${standardDeviation}`);
}

function runProgam() {
    let numbers = [];
    console.log('This program will prompt you for a series of numbers until you enter "done" and then the program will calculate the mean, min, max and standard deviation of all inputted numbers.');
    getUserNumbers(numbers);
    const mean = calcMean(numbers);
    const min = calcMin(numbers);
    const max = calcMax(numbers);
    const standardDeviation = calcStandardDeviation(mean, numbers);
    outputStatistics(numbers, mean, min, max, standardDeviation)
}

runProgam();