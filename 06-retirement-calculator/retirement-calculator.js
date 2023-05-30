const readlineSync = require('./node_modules/readline-sync');

function getUserInputs () {
    const currentAge = Number(readlineSync.question('What is your current age? '));
    const retireAge = Number(readlineSync.question('What is the age you want to retire at? '));
    if (typeof currentAge === 'number' && typeof retireAge === 'number') {
        return calculateOutputs(currentAge, retireAge);
    } else {
        console.log('Please enter numbers.');
        getUserInputs();
    }
    function calculateOutputs (currentAge, retireAge) {
        const currentYear = new Date().getFullYear();
        const yearsToRetire = retireAge - currentAge;
        const yearToRetire = currentYear + yearsToRetire;
        if (yearsToRetire) {
            return `You have ${yearsToRetire} years left until you can retire. Its ${currentYear}, so you can retire in ${yearToRetire}.`;
        } else {
            return 'You can already retire.';
        }

    }
}




console.log(getUserInputs());