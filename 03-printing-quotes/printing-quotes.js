const readlineSync = require('./node_modules/readline-sync');

const userQuote = readlineSync.question('What is the quote?');
const quoteAuthor = readlineSync.question('Who is the quote author?');

function printQuote (quote, author) {
    return `"${quote}" - ${author}`;
}

console.log(printQuote(userQuote, quoteAuthor));