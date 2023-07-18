'use strict';

const readlineSync = require('readline-sync');

function getContestants(contestants) {
    let contestant = 'placeholder';
    while (contestant) {
        contestant = readlineSync.question('Enter a name: ');
        if (contestant) {
            contestants.push(contestant);
        }
    }
    pickWinner(contestants);
}

function pickWinner (contestants) {
    if (contestants.length >= 1) {
        const randomNumber = Math.floor(Math.random() * (contestants.length)); 
        const winner = contestants[randomNumber];
        console.log(randomNumber, winner, contestants);
        console.log(`${winner} is the winner, out of ${contestants.length} contestants.`);
        contestants.splice(randomNumber, 1);
        getContestants(contestants);
    } else {
        console.log('You must enter a least one contestant before a winner can be drawn.');
        runProgram();
    }
}

function runProgram() {
    let contestants = [];
    console.log('This program picks a winner out of a list of entered contestants. When you are ready for a winner to be chosen. Input an empty entry.');
    getContestants(contestants);
}

runProgram();