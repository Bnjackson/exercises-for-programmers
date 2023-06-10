const readlineSync = require('readline-sync');

const stateTaxes = {
    alabama : 9.24,
    alaska : 1.76,
    arizona : 8.40,
    arkansas : 9.47,
    california : 8.82,
    colorado : 7.77,
    connecticut : 6.35,
    delaware : 0,
    dc : 6,
    florida : 7.01, 
    georgia : 7.35,
    hawaii : 4.44, 
    idaho : 6.02,
    illinois : 8.81, 
    indiana : 7.00,
    iowa : 6.94,
    kansas : 8.70,
    kentucky : 6,
    louisiana : 9.55,
    maine : 5.50,
    maryland : 6,
    massachusetts : 6.25,
    michigan : 6,
    minneosata : 7.49,
    mississippi : 7.07,
    missouri : 8.29,
    montana : 0,
    nebraska : 6.94,
    nevada : 8.23,
    'new hampshire' : 0,
    'new jersey' : 6.6,
    'new mexico' : 7.84, 
    'new york' : 8.52,
    'north carolina' : 6.98,
    'north dakota' : 6.96, 
    ohio : 7.22, 
    oklahoma : 8.97,
    oregon : 0,
    pennsylvania : 6.34,
    'rhode island' : 7,
    'south carolina' : 7.44,
    'south dakota' : 6.40,
    tennessee : 9.55,
    texas : 8.20,
    utah : 7.19,
    vermont : 6.24,
    virginia : 5.75,
    washington : 9.29,
    'west virginia' : 6.52,
    wisconsin : 5.43,
    wyoming : 5.22
};

function getStateAndAmount () {
    const userAmount = Number(readlineSync.question('What is the order amount? '));
    const userState = readlineSync.question('What is the state? Use state full name ').toLowerCase();
    function checkUserInputs (amount, state) {
        if(isNaN(amount)) {
            console.log('Please enter a number for the order amount.')
            getStateAndAmount();
        } else if (!stateTaxes[state]) {
            console.log('Please enter a correct state.')
            getStateAndAmount();
        } else {
            calcTaxAmountAndTotal(userAmount, userState)
        }
        
    }
    checkUserInputs(userAmount, userState);
}

function calcTaxAmountAndTotal (amount, state) {
    const taxRate = stateTaxes[state] / 100;
    let taxAmount = (taxRate * amount).toFixed(2);
    taxAmount = Number(taxAmount);
    const total = taxAmount + amount; 
    outputTotal(amount, state, taxRate, taxAmount, total)
}

function outputTotal (amount, state, taxRate, taxAmount, total) {
    console.log(`The original amount is $${amount} the state is ${state}`);
    console.log(`The tax rate in ${state} is ${taxRate}%.`)
    console.log(`The amount of tax is $${taxAmount} and the overall total is $${total}`)
}

getStateAndAmount();