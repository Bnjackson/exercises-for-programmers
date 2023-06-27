const readlineSync = require('readline-sync');

function getUserChoice() {
    const imperialOrMetric = readlineSync.question('Would you like to calculate your BMI using Imperial Or Metric? ').toLowerCase();
    if (imperialOrMetric === 'metric') {
        getMetricMeasurements();
    } else if (imperialOrMetric === 'imperial') {
        getImperialMeasurements();
    } else {
        console.log('Please enter either "Imperial" or "Metric"');
        getUserChoice();
    }
    function getMetricMeasurements() {
        const usersHeight = Number(readlineSync.question('What is your height in cm? '));
        const usersWeight = Number(readlineSync.question('What is your weight in kg? '));
        checkUserMeasurements(usersHeight, usersWeight, 'metric');
    } 
    function getImperialMeasurements() {
        const usersHeight = Number(readlineSync.question('What is your height in inches? '));
        const usersWeight = Number(readlineSync.question('What is your weight in pounds? '));
        checkUserMeasurements(usersHeight, usersWeight, 'imperial');
    }
    function checkUserMeasurements(usersHeight, usersWeight, system) {
        if (usersHeight && usersWeight) {
            calcUsersBMI(usersHeight, usersWeight, system);
        } else {
            console.log('For your height and weight please enter inputs as numbers.');
            system === 'metric' ? getMetricMeasurements() : getImperialMeasurements();
        }
    }
}

function calcUsersBMI(height, weight, system) {
    let BMI;
    let usersWeightClass;
    if(system === 'metric') {
        BMI = (weight / height / height) * 10000;
    } else {
        BMI = weight / (height * height) * 703;
    }
    function calcUserWeightClass() {
        if (BMI < 18.5) {
            usersWeightClass = 'Underweight';
        } else if (BMI >= 18.5 && BMI <= 24.9) {
            usersWeightClass = 'Normal';
        } else if (BMI >= 25 && BMI <= 29.9) {
            usersWeightClass = 'Overweight';
        } else if (BMI >= 30 && BMI <= 34.9) {
            usersWeightClass = 'Obese';
        } else if (BMI > 35) {
            usersWeightClass = 'Extemely Obese';
        }
    }
    calcUserWeightClass();
    function outputResults() {
        BMI = BMI.toFixed(2);
        console.log(`Your BMI is ${BMI}, and your weight class is ${usersWeightClass}.`);
    }
    outputResults();
}

getUserChoice();