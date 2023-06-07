"use strict";
const readlineSync = require('readline-sync');

const currencies = {
    pound : {
        euroExchangeRate : 1.16,
        dollarExchangeRate : 1.24,
        yenExchangeRate : 173.47
    },
    euro : {
        poundExchangeRate : 0.86,
        dollarExchangeRate : 1.07,
        yenExchangeRate : 149.33
    }, 
    dollar : {
        poundExchangeRate : 0.81,
        euroExchangeRate : 0.94,
        yenExchangeRate : 139.65
    },
    yen : {
        poundExchangeRate : 0.0058,
        euroExchangeRate : 0.0067,
        dollarExchangeRate : 0.0072 
    }
}

function getUserInputs() {
    console.log('This program will exchange to and from pounds, euros, dollars and yen. All inputted currencies must be in the singular and you cannot exchange the same currencies.')
    const exchangeCurrency = readlineSync.question('What is the currency you wish to exchange? ').toLowerCase();
    const amountToExchange = Number(readlineSync.question('What is the amount you wish to exchange? '))
    const exchangedCurrency = readlineSync.question('What is the currency you wish to exchange to? ').toLowerCase();
    console.log(exchangeCurrency, amountToExchange, exchangedCurrency);
    function checkUserInputs(firstCurrency, amount, secondCurrency) {
        const acceptedCurrencies = ['pound', 'euro', 'dollar', 'yen'];
        for (let i = 0; i < 1; i++) {
            let checkCurrencies = 0;
            for(let i = 0; i < acceptedCurrencies.length; i++) {
                if (firstCurrency === acceptedCurrencies[i] && secondCurrency !== acceptedCurrencies[i] || secondCurrency === acceptedCurrencies[i] && firstCurrency !== acceptedCurrencies[i]) {
                    //Conditional checks to see if user inputs match currencies in array, does not run if both inputs match the same currency.
                    checkCurrencies++;
                    //checkCurrencies value increases every time a user inputs matches a currency. It should = 2 if user inputs are correct.
                }
            }
            if(checkCurrencies !== 2) {
                console.log('Please check currency spelling. Also currencies must be in the singular and the you cannot exchange the same currencies.');
                return getUserInputs();
            }
        }
        if(isNaN(amount)) {
            console.log('please enter a number when asked for the amount to exchange.');
            return getUserInputs();
        }
    }
    checkUserInputs(exchangeCurrency, amountToExchange, exchangedCurrency);
    getExchangeRate(exchangeCurrency, amountToExchange, exchangedCurrency);
}

function getExchangeRate(exchangeCurrency, amountToExchange, exchangedCurrency) {
    let exchangeRate;
    for (let key in currencies) {
        if(key === exchangeCurrency) {
            console.log(key);
            for(let innerKey in currencies[key]) {
                if(innerKey === `${exchangedCurrency}ExchangeRate`) {
                    exchangeRate = currencies[key][innerKey];
                    console.log(exchangeRate);
                    break;
                }
            }
        }
    }
    function calcExchangedAmount(amountToExchange, exchangeRate) {
        return amountToExchange * exchangeRate;
    }
    const exchangedAmount = calcExchangedAmount(amountToExchange, exchangeRate);
    function outputExchange(exchangedAmount) {
        console.log(`${amountToExchange} ${exchangeCurrency} at an exchange rate of ${exchangeRate} is ${exchangedAmount} ${exchangedCurrency}`);
    }
    outputExchange(exchangedAmount)
}


getUserInputs();
