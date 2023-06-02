const readlineSync = require('./node_modules/readline-sync');

function getUserInputs () {
    const numPeople = Number(readlineSync.question('How many people? '));
    const numPizzas = Number(readlineSync.question('How many pizzas do you have? '));
    const numSlices = Number(readlineSync.question('How many slices per pizza? '));
    function checkInputsAreNums () {
        if(!Number.isNaN(numPeople) && !Number.isNaN(numPizzas) && !Number.isNaN(numSlices)) {
            console.log(`${numPeople} people, with ${numPizzas} pizzas, and ${numSlices} slices per pizza.`);
            calcAmountOfSlices(numPeople, numPizzas, numSlices);
        } else {
            console.log('Please enter numbers');
            getUserInputs();
        }
    }
    checkInputsAreNums();
}

function calcAmountOfSlices (people, pizzas, slices) {
    const totalSlices = pizzas * slices;
    let slicesPerPerson = totalSlices / people;
    let leftoverSlices = 0;
    console.log(slicesPerPerson)
    function calcSliceDistribution () {
        if(Number.isInteger(slicesPerPerson)) {
            console.log('Running');
            console.log(`Each person gets ${slicesPerPerson} slices of pizza. There are ${leftoverSlices} leftover slices.`);
        } else {
            let wholeSlicesPerPerson;
            slicesPerPerson = String(slicesPerPerson);
            //By converting slicesPerPerson into a string it allows baccess to the first digit, which is the whole number of slices. Which will be stored in wholeSlicesPerPerson
            wholeSlicesPerPerson = slicesPerPerson[0];
            wholeSlicesPerPerson = Number(wholeSlicesPerPerson), slicesPerPerson = Number(slicesPerPerson);
            slicesPerPerson -= wholeSlicesPerPerson;
            //Will just leave the number after the decimal point which is the leftover amount
            leftoverSlices = slicesPerPerson;
            leftoverSlices *= people;
            //Will calculate the total amount of leftover slices.
            console.log(`Each person get ${wholeSlicesPerPerson} slices of pizza. There are ${leftoverSlices.toFixed(2)} leftover slices.`);
        }
    }
    calcSliceDistribution();
}

getUserInputs();