'use strict';
const readlineSync = require('readline-sync');

function getUserAge() {
    return Number(readlineSync.question('What is your age? '));
}

function getUserRestingRate() {
    return Number(readlineSync.question('What is your resting heart rate? '));
}

function checkUserInputs(userAge, usersRestingHeartRate) {
    return userAge && usersRestingHeartRate ? true : false;
}

function calcKarvonenHeartRate(karvonenHeartRate, usersAge, usersRestingHeartRate) {
    let targetHeartRate = 0;
    for (let intensity = 55; intensity <= 95; intensity += 5) {
        targetHeartRate = (((220 - usersAge) - usersRestingHeartRate) * (intensity / 100)) + usersRestingHeartRate;
        karvonenHeartRate[`${intensity}%`] = `${Math.round(targetHeartRate)} bpm`;
    }
    return karvonenHeartRate;
}


function runProgram() {
    let karvonenHeartRate = {};
    const userAge = getUserAge();
    const usersRestingHeartRate = getUserRestingRate();
    if (checkUserInputs(userAge, usersRestingHeartRate)) {
        karvonenHeartRate = calcKarvonenHeartRate(karvonenHeartRate, userAge, usersRestingHeartRate);
        console.log(`Resting pulse : ${usersRestingHeartRate} bpm, Age : ${userAge} years`);
        console.table(karvonenHeartRate);
    } else {
        console.log('!!! both inputs must be enetered numerically');
        runProgram();
    }
}

runProgram();