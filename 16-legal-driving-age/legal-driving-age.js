'use stict';

const readlineSync = require('readline-sync');

const countriesLegalDrivingAges = {
    'United States' : 16,
    'United Kingdom' : 17,
    'France' : 18,
    'Germany' : 17,
    'Italy' : 17,
    'Australia' : 16.5,
    'El Salvador' : 15,
    'Niger' : 23
}

function getUsersAge() {
    const usersAge = Number(readlineSync.question('What is your age? '));
    function checkUserAge(age) {
        if(age === 0 || isNaN(age)) {
            console.log('Please enter a number for your age, that is not 0.');
            getUsersAge();
        } else {
            output(usersAge);
        }
    }
    checkUserAge(usersAge);
}

function output(usersAge) {
    for (const countries in countriesLegalDrivingAges) {
        if(usersAge >= countriesLegalDrivingAges[countries]) {
            console.log(`You are old enough to legally drive in ${countries}. Their legal driving age is ${countriesLegalDrivingAges[countries]} years old, and you are ${usersAge} years old.`);
        } else if (usersAge < countriesLegalDrivingAges[countries]) {
            console.log(`You are not old enough to legally drive in ${countries}. Their legal driving age is ${countriesLegalDrivingAges[countries]} years old, and you are ${usersAge} years old.`);
        }
    }
}

getUsersAge();