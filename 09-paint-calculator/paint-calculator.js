const readlineSync = require('./node_modules/readline-sync');

function getCeilingDimensions() {
    const ceilingLength = Number(readlineSync.question('What is the ceilling length in feet? '));
    const ceilingWidth = Number(readlineSync.question('What is the ceiling width in feet? '));
    function checkInputs() {
        if(ceilingLength && ceilingWidth) {
            return true;
        } else {
            return false;
        }
    }
    if(checkInputs()) {
        console.log(`The ceiling length is ${ceilingLength} feet, the ceiling width is ${ceilingWidth} feet.`)
        return calcGallonsNeeded(ceilingLength, ceilingWidth);
    } else {  
        console.log('Please enter numbers.')
        getCeilingDimensions();
    }
}

function calcGallonsNeeded(length, width) {
    const gallonToSquareFeet = 350;
    const squareFeet = length * width;
    const numOfGallons = Math.ceil(squareFeet / gallonToSquareFeet);
    return `You will need to purchase ${numOfGallons} gallons of paint to cover ${squareFeet} square feet.`;
}

console.log(getCeilingDimensions());