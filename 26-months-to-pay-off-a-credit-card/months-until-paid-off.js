const readlineSync = require('readline-sync');

function getUserInputs() {
    console.log('This program will prompt you for your credit card balance, your card APR and the monthly payment you can make.');
    const userBalance = Number(readlineSync.question('What is your credit card balance? '));
    const userCardApr = Number(readlineSync.question('What is the APR on the card? As a percentage '));
    const monthlyPayment = Number(readlineSync.question('What is the monthly payment you can make? '));
    function checkUserInputs() {
        if (userBalance && userCardApr && monthlyPayment) {
            calcMonthsUntilPaidOff(userBalance, userCardApr, monthlyPayment);
        } else {
            console.log('All inputs must be numbers.');
            getUserInputs();
        }
    }
    checkUserInputs();
}

function calcMonthsUntilPaidOff(balance, apr, monthlyPayment) {
    let updatedBalance = balance;
    let monthsUntilPaidOff = 0;
    while (updatedBalance > 0) {
        updatedBalance += updatedBalance * apr / 100 / 12;
        updatedBalance -= monthlyPayment;
        monthsUntilPaidOff++;
    }
    function outputResults() {
        console.log(`It will take you ${monthsUntilPaidOff} months to pay off £${balance}, with ${apr}% APR, if you pay £${monthlyPayment} a month`);
    }
    outputResults();
}

getUserInputs();