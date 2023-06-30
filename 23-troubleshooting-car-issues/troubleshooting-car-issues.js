'use strict';
const readlineSync = require('readline-sync');

function carTroubleshootSystem() {
    console.log('All questions should be answered with either "y" for yes or "n" for no');
    function carSilentQuesion() {
        const carSilent = readlineSync.question('Is the car silent when you turn the key? ').toLowerCase();
        if(checkAnswer(carSilent)) {
            carSilent === 'y' ? batteryTerminalsQuestion() : clickingNoiseQuestion();
        }
    }
    function checkAnswer(answer) {
        if(answer === 'y' || answer === 'n') {
            return true;
        } else {
            console.log('All questions should be answered with either "y" for yes or "n" for no');
            carTroubleshootSystem();
        }
    }
    function batteryTerminalsQuestion() {
        const terminalsCorroded = readlineSync.question('Are the battery terminals corroded? ').toLowerCase();
        if(checkAnswer(terminalsCorroded)) {
            console.log(terminalsCorroded === 'y' ? 'Clean terminals and try again' : 'Replace the cables and try again.');
        }
    }
    function clickingNoiseQuestion() {
        const clickingNoise = readlineSync.question('Does the car make a clicking noise? ').toLowerCase();
        if(checkAnswer(clickingNoise)) {
            clickingNoise === 'y' ? console.log('Replace the battery') : crankUpQuestion();
        }
    }
    function crankUpQuestion() {
        const crankUp = readlineSync.question('Does the car crank but fail to start? ').toLowerCase();
        if(checkAnswer(crankUp)) {
            crankUp === 'y' ? console.log('Check spark plug connections') : engineStartQuestion();
        }
    }
    function engineStartQuestion() {
        const engineStart = readlineSync.question('Does the engine start and die? ').toLowerCase();
        if(checkAnswer(engineStart)) {
            engineStart === 'y' ? fuelInjectionQuestion() : console.log('The decision tree ends here');
        }
    }
    function fuelInjectionQuestion() {
        const fuelInjection = readlineSync.question('Does your car have fuel injection? ').toLowerCase();
        if(checkAnswer(fuelInjection)) {
            fuelInjection === 'y' ? console.log('Get it in for service') : console.log('Check to ensure the choke is opening and closing');
        }
    }
    carSilentQuesion();
}
carTroubleshootSystem()