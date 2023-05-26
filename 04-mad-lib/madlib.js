const readlineSync = require('./node_modules/readline-sync'); 

const userNoun = readlineSync.question('What is your noun?');
const userVerb = readlineSync.question('what is your verb?');
const userAdverb = readlineSync.question('What is your adverb?');
const userAdjective = readlineSync.question('What is your adjective?');

function createMadLib (noun, verb, adverb, adjective) {
    return `Do you ${verb} your ${adjective} ${noun} ${adverb}? That's hilarious!`;
}

console.log(createMadLib(userNoun, userVerb, userAdverb, userAdjective));