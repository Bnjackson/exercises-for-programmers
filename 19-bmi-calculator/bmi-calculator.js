const readlineSync = require('readline-sync');

function getUserChoice() {
    const imperialOrMetric = readlineSync.question('Would you like to calculate your BMI using Imperial Or Metric? ').toLowerCase();
    if (imperialOrMetric === 'metric') {
        getMetricMeasurements();
    } else if (imperialOrMetric === 'imperial') {
        getImperialMeasurements();
    } else {
        console.log('Please enter either "Imperial" or "Metric"');
    }
    function getMetricMeasurements() {
        const usersHeight = Number(readlineSync.question('What is youre height in cm? '));
        const usersWeight = Number(readlineSync.question('What is youre weight in kg? '));
        checkUserMeasurements(usersHeight, usersWeight, 'metric');
    } 
    function getImperialMeasurements() {
        const usersHeight = Number(readlineSync.question('What is youre height in inches? '));
        const usersWeight = Number(readlineSync.question('What is youre weight in pounds? '));
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

function calcUsersBMI() {

}

getUserChoice();