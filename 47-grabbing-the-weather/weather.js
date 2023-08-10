'use strict';

require('dotenv').config;
const readlineSync = require('readline-sync');

async function getUserInput(latOrLon) {
    const userInput = Number(readlineSync.question(`what is your ${latOrLon}? `));
    if (isNaN(userInput)) {
        console.log('Input must be a number');
        return getUserInput(latOrLon);
    } else {
        return userInput;
    }
}

function getWeatherData() {
    
}

async function main() {
    const latitude = await getUserInput('latitude');
    const longitude = await getUserInput('longitude');
    
}

main();