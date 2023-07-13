'use strict';

const readlineSync = require('readline-sync');

function getDifficulty() {
    console.log('The game has three levels of difficulty. The first level is a number between 1 - 10, the second level is a number between 1 - 100, and the third level is a number between 1 and 1000')
    const userDifficultyChoice = Number(readlineSync.question('What difficulty would you like to play the game with? 1, 2 or 3 '));
    if (userDifficultyChoice) {
        return userDifficultyChoice;
    } else {
        console.log('!!! The difficulty choice must be either 1, 2 or 3');
        getDifficulty();
    }
}

function getRandomNumber(difficulty) {
    let min = 0;
    let max = 0;
    if (difficulty === 1) {
        min = 1, max = 11;
        return Math.floor(Math.random() * (max - min) + min);
    } else if (difficulty === 2) {
        min = 10, max = 101;
        return Math.floor(Math.random() * (max - min) + min);
    } else if (difficulty === 3) {
        min = 100, max = 1001;
        return Math.floor(Math.random() * (max - min) + min);
    }
}

function playGame(randomNumber, userGuesses) {
    let userGuess = Number(readlineSync.question('What\'s your guess? '));
    if (userGuesses.includes(userGuess)) {
        console.log(`You have already entered ${userGuess} before`);
        playGame(randomNumber, userGuesses);
    } else {
        userGuesses.push(userGuess);
    }
    if (!userGuess || userGuess === ' ') {
        console.log(`Your input must be numerical and cannot be empty`);
        playGame(randomNumber, userGuesses);
    } else if (userGuess < randomNumber) {
        console.log(`Too low. Guess again: ${userGuesses.length}`);
        playGame(randomNumber, userGuesses);
    } else if (userGuess > randomNumber) {
        console.log(`Too high. Guess again: ${userGuesses.length}`);
        playGame(randomNumber, userGuesses);
    }
}

function gameComplete(userGuesses) {
    let comment = '';
    if (userGuesses.length === 1) {
        comment = 'You\'re a mind reader!'
    } else if (userGuesses.length >= 2 && userGuesses.length <= 4) {
        comment = 'Most impressive.'
    } else if (userGuesses.length >= 3 && userGuesses.length <= 6) {
        comment = 'You can do better than that.'
    } else if (userGuesses.length <= 7) {
        comment = 'Better luck next time.';
    }
    console.log(`The number was ${userGuesses[userGuesses.length - 1]}, you got it in ${userGuesses.length} guesses: ${comment}`);
}

function runGame() {
    console.log('This is a guess the number game.')
    let userGuesses = [];
    const difficulty = getDifficulty();
    const randomNumber = getRandomNumber(difficulty);
    console.log(randomNumber);
    playGame(randomNumber, userGuesses);
    gameComplete(userGuesses);
    const playAgain = readlineSync.question('Do you want to play again? Answer "yes" or "no" ').toLowerCase();
    if(playAgain === 'yes') {
        userGuesses = [];
        runGame();
    } else {
        console.log('Thanks for playing!')
    }
}

runGame();