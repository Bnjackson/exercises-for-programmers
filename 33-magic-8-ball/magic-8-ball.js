const readlineSync = require('readline-sync');

function runGame() {
    const responses = ['Yes', 'No', 'Maybe', 'Ask again later.'];
    const userQuestion = readlineSync.question('Whats Your question? ');
    const randomNumber = Math.floor(Math.random() * 4);
    console.log(userQuestion);
    console.log(responses[randomNumber]);
}

runGame();