const readlineSync = require('readline-sync');

function getRateOfReturn() {
    console.log('This program will return how many years it will take for your investment to double based on the rate of return.');
    const rateOfReturn = Number(readlineSync.question('What is the rate of return of your investment? '));
    function checkUserInput() {
        for(let i = 0; i < 1; i++) {
            if (!rateOfReturn) {
                console.log(`The rate of return must be a numeric value you entered ${rateOfReturn}`);
                getRateOfReturn();
            } else if (rateOfReturn === 0) {
                console.log('The rate of return cannot be 0, as computers cannot divide by 0.');
                getRateOfReturn();
            } else {
                calculateYearsToDouble();
            }
        }
    }
    function calculateYearsToDouble () {
        let yearsToDouble = 72 / rateOfReturn;
        console.log(`The number of years it will take for you to double your investment is ${yearsToDouble}. Based on a rate of return of ${rateOfReturn}%`);
    }
    checkUserInput();
}

getRateOfReturn();