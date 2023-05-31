const readlineSync = require('./node_modules/readline-sync');

function getUsersInput() {
    const roomLength = Number(readlineSync.question('What is the room\'s length in feet?'));
    const roomWidth =Number(readlineSync.question('What is the room\'s width in feet?'));
    console.log(roomLength, roomWidth);
    if (typeof roomLength === 'number' && typeof roomWidth === 'number') {
        console.log(`You entered dimensions of ${roomLength} feet by ${roomWidth} feet.`);
        return calcRoomArea(roomLength, roomWidth);
    } else {
        console.log('You need to enter numbers.');
        getUsersInput();
    }
}

function calcRoomArea(length, width) {
    const squareFeet = length * width;
    const conversionFactor = 0.09290304;
    const squareMeter = squareFeet * conversionFactor;
    return `The area is ${squareFeet} square feet and ${squareMeter.toFixed(3)} square meters.`;
}

console.log(getUsersInput());