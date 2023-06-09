"use strict";
const readlineSync = require('readline-sync');

function getUserInputs() {
    const principal = Number(readlineSync.question('What is the principal? '));
    const rateOfInterest = Number(readlineSync.question('What is the rate of interest? Interest should be inputted as a whole number e.g. 15. '));
    const numYears = Number(readlineSync.question('What is the the number of years the amount is invested? '));
    function checkUserInputs(principal, rateOfInterest, numYears) {
        if(!isNaN(principal) && !isNaN(rateOfInterest) && !isNaN(numYears)) {
            calcAccumulation(principal, rateOfInterest, numYears);
        } else {
            console.log('All the inputs should be numbers?');
            getUserInputs();
        }
    }
    checkUserInputs(principal, rateOfInterest, numYears);

}

function calcAccumulation(principal, rateOfInterest, numYears) {
    let updatedPrincipal = principal;
    const interestRate = rateOfInterest / 100;
    const yearsAccumulation = {};
    function calcYearlyAccumulation() {
        //function will calculate yearly accumulation using a loop and assign the value to the object with the key being the corresponding year.
        let currentYear = new Date().getFullYear();
        for(let i = 0; i < numYears; i++) {
            const yearlyAccumulation = updatedPrincipal * interestRate;
            updatedPrincipal += yearlyAccumulation;
            ++currentYear;
            yearsAccumulation[currentYear] = updatedPrincipal.toFixed(2);
            //Fixes number to two decimal places. Also converts numbers to strings, so will need to convert back if I need to do any operations on them.
        }
    }
    function calcTotalAccumlation(yearsAccumulation) {
        const lastValue = Object.values(yearsAccumulation).pop();
        return lastValue;
    }
    calcYearlyAccumulation();
    let totalAccruedAmount = calcTotalAccumlation(yearsAccumulation);
    outputAmountAccrued(principal, rateOfInterest, numYears, totalAccruedAmount, yearsAccumulation);
}


function outputAmountAccrued(principal, rateOfInterest, numYears, totalAccruedAmount, yearsAccumulation) {
    console.table(yearsAccumulation);
    console.log(`After ${numYears} years at ${rateOfInterest}%, the original investment of £${principal} will be worth £${totalAccruedAmount}.`);
}

getUserInputs();