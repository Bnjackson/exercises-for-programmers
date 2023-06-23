const readlineSync = require('readline-sync');

const temps = ['c', 'f', 'k'];
const tempConversion = {
    cf : function(temp) {
        return (temp * 9/5) + 32;
    },
    fc : function(temp) {
        return (temp - 32) * 5/9;
    }, 
    ck : function(temp) {
        return temp + 273.15;
    },
    kc : function(temp) {
        return temp - 273.15;
    },
    fk : function(temp) {
        return (temp + 459.67) * 5/9;
    },
    kf : function(temp) {
        return (temp - 273.15) * 9/5 + 32;
    }
};

function getUserInputs() {
    console.log('What temperature scale would you like to convert from?')
    const convertFrom = readlineSync.question('Enter \"c\" for Celsius, \"f\" for Fahrenheit or \"k"\ for kelvin ').toLowerCase();
    const tempInput = Number(readlineSync.question('What is the temperature you wish to convert? '));
    console.log('What temperature scale would you like to convert to?')
    const convertTo = readlineSync.question('Enter \"c\" for Celsius, \"f\" for Fahrenheit or \"k"\ for kelvin ').toLowerCase();
    function checkUserInputs() {
        if (!temps.includes(convertFrom) || !temps.includes(convertTo)) {
            console.log('For temperature input, please enter one of \"c\" for Celsius, \"f\" for Fahrenheit or \"k"\ for kelvin ');
            getUserInputs();
        } else if (!tempInput) {
            console.log('Please enter a number for the temperature?');
            getUserInputs();
        } else {
            temperatureConversion(convertFrom, convertTo, tempInput);
        }
    }
    checkUserInputs()
}

function temperatureConversion(convertFrom, convertTo, temp) {
    let conversionKey = convertFrom + convertTo
    const convertedTemp = tempConversion[conversionKey](temp);
    if(convertTo === 'c') {
        console.log(`The temperature in Celsius is ${convertedTemp}.`);
    } else if (convertTo === 'f') {
        console.log(`The temperature in Fahrenheit is ${convertedTemp}.`);
    } else if (convertTo === 'k') {
        console.log(`The temperature in Kelvin is ${convertedTemp}.`);
    }
}


getUserInputs();