const readlineSync = require('./node_modules/readline-sync');

function getUserNumbers () {
    const NUM1 = Number(readlineSync.question('What is your first Number?'));
    const NUM2 = Number(readlineSync.question('What is your second Number?'));
    if (typeof NUM1 === 'number' && typeof NUM2 === 'number' && NUM1 >= 0 && NUM2 >= 0) {
        return `What is the first number? ${NUM1}
        what is the second number? ${NUM2}
        ${NUM1} + ${NUM2} = ${NUM1 + NUM2}
        ${NUM1} - ${NUM2} = ${NUM1 - NUM2}
        ${NUM1} * ${NUM2} = ${NUM1 * NUM2}
        ${NUM1} / ${NUM2} = ${NUM1 / NUM2}`;
    } else {
        console.log('Inputs must be positive numbers');
    }
    function getSum () {
        return NUM1 + NUM2;
    }
    function getDifference () {
        return NUM1 - NUM2;
    }
    function getProduct () {
        return NUM1 * NUM2;
    }
    function getQuotient () {
        return NUM1 / NUM2;
    }
}

console.log(getUserNumbers());