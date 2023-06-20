'use strict';

const readlineSync = require('readline-sync');

const countriesBAC = {
    'uk' : 0.08,
    'us' : 0.08,
    'france' : 0.05,
    'germany' : 0.05,
    'ireland' : 0.05,
    'japan' : 0.03
};

function getUserInputs() {
    console.log('This program takes several inputs and returns your blood alcohol content (BAC) aswell as if you can legally drive in the inputted country.');
    const usersWeight = Number(readlineSync.question('What is your weight in pounds? '));
    const usersGender = readlineSync.question('What is your gender? male or female ').toLowerCase();
    const numOfDrinks = Number(readlineSync.question('What is the number of drinks you have had? '));
    const alcoholByVolume = Number(readlineSync.question('What is the volume of alcohol of the drinks consumed? Must be entered in ounces '));
    const timeSinceDrink = Number(readlineSync.question('How long has it been since your last drink? Enter in hours '));
    const usersCountry = readlineSync.question('What country do you want compare your BAC to the legal limit? uk, us, france, germany, ireland or japan are the options. ').toLowerCase();
    function checkUserInputs() {
        if (!usersWeight || !numOfDrinks || !alcoholByVolume || !timeSinceDrink) {
            console.log('All inputs apart from gender and country questions should be inputted as numbers');
            getUserInputs()
        } else if (usersGender !== 'male' && usersGender !== 'female') {
            console.log(usersGender);
            console.log('The input for the usersGender question must be either male or female');
        } else if (!countriesBAC[usersCountry]) {
            'Inputted country could not be found, makes sure spelling is correct and that inputted country is on list of options';
        } else {
            calcUsersBAC(usersWeight, usersGender, numOfDrinks, alcoholByVolume, timeSinceDrink, usersCountry);
        }
    }
    checkUserInputs();
}

function calcUsersBAC(weight, gender, numOfDrinks, alcoholVolume, hours, country) {
    const alcoholDistributionRatio = gender === 'female' ? 0.66 : 0.73;
    const totalAmountOfAlcohol = alcoholVolume * numOfDrinks;
    const countriesBACLimit = countriesBAC[country];
    const usersBAC = (totalAmountOfAlcohol / weight * alcoholDistributionRatio) - .015 *hours;
    function outputResults() {
        console.log(`Your Blood Alcohol Content is ${usersBAC}`);
        if(usersBAC < countriesBACLimit) {
            console.log(`You can drive in ${country} as your BAC is lower than the legal limit of ${countriesBACLimit}`);
        } else {
            console.log(`You cannot drive in ${country} as your BAC is higher than the legal limit of ${countriesBACLimit}`);
        }
    }
    outputResults();
};
getUserInputs();
