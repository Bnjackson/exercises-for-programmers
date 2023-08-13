'use strict';

const readlineSync = require('readline-sync');
require('dotenv').config();

async function main() {
    console.log(`This program will provide some movie recommendations based on your inputs.`);
    const  apiParameters = {
        'start year' : await getYear('start'),
        'end year' : await getYear('end'),
        'min IMDB score' : await getMinScore(),
        'genre' : await getGenre(),
        'sort type' : await getSortType()
    };
    console.log(apiParameters);
    const recommendations = await fetchMovieRecommendationsData(apiParameters);
    console.log(recommendations);
}

async function getYear(startOrEnd) {
    let userInput;
    if (startOrEnd === 'start') {
        userInput = Number(readlineSync.question(`What year do you want to start your search from? `));
    } else if (startOrEnd === 'end') {
        userInput = Number(readlineSync.question(`What year do you want to end your search at? `));
    }
    function checkYearInput(yearInput) {
        if (isNaN(yearInput) || yearInput < 1970 || yearInput > 2020) {
            console.log('Input must be a number and between 1970, 2020');
            return false;
        } else {
            return true;
        }
    }
    return checkYearInput(userInput) ? userInput : getYear(startOrEnd); 
}

async function getMinScore() {
    const userInput = Number(readlineSync.question('What is the minimum IMDB score for the movie? '));
    function checkScoreInput(scoreInput) {
        if (isNaN(scoreInput) || scoreInput < 1.5 || scoreInput > 9) {
            console.log('Score input must be a number and between 1.5 and 9')
            return false;
        } else {
            return true;
        }
    }
    return checkScoreInput(userInput) ? userInput : getMinScore();
}

async function getGenre() {
    const genres = ['action', 'horror', 'drama', 'comedy', 'science fiction', 'fantasy', 'documentary', 'thriller', 'adventure', 'animated', 'romance', 'western', 'musical'];
    console.log(genres);
    const userInput = readlineSync.question('What genre of movie would you like to watch? Choose from genres above. ').toLowerCase();
    function checkGenreInput(genreInput) {
        if (genres.includes(userInput)) {
            return true;
        } else {
            console.log('Inputted genre does not match any of the above genres.');
            return false;
        }
    }
    return checkGenreInput(userInput) ? userInput : getGenre();
}

async function getSortType() {
    const sortTypes = ['highest rated', 'lowest rated', 'latest', 'oldest'];
    console.log(sortTypes);
    let userInput = readlineSync.question('How would you like to sort your movie recommendations? Enter one of the above choices. ').toLowerCase();
    function checkSortType(sortInput) {
        if (sortTypes.includes(sortInput)) {
            userInput = removeSpaces(sortInput);
            return true;
        } else {
            console.log('Inputted sort type must match one of the above types.');
            return false;
        }
    }
    function removeSpaces(inputStr) {
        return inputStr.replace(/\s+/g, '');
    }
    return checkSortType(userInput) ? userInput : getSortType();
}

async function fetchMovieRecommendationsData(apiParameters) {
    const apiKey = process.env.API_KEY;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(`https://ott-details.p.rapidapi.com/advancedsearch?start_year=${apiParameters['start year']}&end_year=${apiParameters['end year']}&min_imdb=${apiParameters['min IMDB score']}&genre=${apiParameters.genre}&sort=${apiParameters['sort type']}&page=1`, options);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error('Fetch failed', err);
    }
}

main();