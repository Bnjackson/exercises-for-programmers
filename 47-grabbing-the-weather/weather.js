'use strict';

require('dotenv').config();
const readlineSync = require('readline-sync');

async function main() {
    const latitude = await getUserInput('latitude');
    const longitude = await getUserInput('longitude');
    const weatherData = await fetchWeatherData(latitude, longitude);
    const filteredData = filterData(weatherData);
    const dataToBeOutput = {};
    getSunriseSunset(filteredData, dataToBeOutput);
    getWindDirection(filteredData, dataToBeOutput);
    getTemperature(filteredData, dataToBeOutput);
    getTypeOfWeather(filteredData, dataToBeOutput);
    outputResults(dataToBeOutput);
}

async function getUserInput(latOrLon) {
    const userInput = Number(readlineSync.question(`what is your ${latOrLon}? `));
    if (isNaN(userInput)) {
        console.log('Input must be a number');
        return getUserInput(latOrLon);
    } else {
        return userInput;
    }
}

async function fetchWeatherData(lat, lon) {
    const apiKey = process.env.API_KEY;
    console.log(apiKey);
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error fetching data', err);
    }
}

function filterData(data) {
    let filteredData = {};
    ({coords: filteredData.coords, weather: filteredData.weather, main: filteredData.main, wind: filteredData.wind, sys: filteredData.sys, name: filteredData.name} = data);
    return filteredData;
}

function getSunriseSunset(data, dataToBeOutput) {
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);

    const sunriseFormatted = `${sunrise.getHours()}:${sunrise.getMinutes()}:${sunrise.getSeconds()}`;
    const sunsetFormatted = `${sunset.getHours()}:${sunset.getMinutes()}:${sunset.getSeconds()}`;

    dataToBeOutput.sunrise = sunriseFormatted;
    dataToBeOutput.sunset = sunsetFormatted;
}

function getWindDirection(data, dataToBeOutput) {
    const directions = ['North', 'North East', 'East', 'South East', 'South', 'South West', 'West', 'North West'];
    dataToBeOutput.windDirection = directions[Math.round(data.wind.deg / 45) % 8];
}

function getTemperature(data, dataToBeOutput) {
    const tempInCelsius = Math.round(data.main.temp - 273.15);
    const tempInFahrenheit = Math.round((data.main.temp - 273.15) * 1.8 + 32);
    const tempInKelvin = data.main.temp;
    
    dataToBeOutput.celsius = tempInCelsius;
    dataToBeOutput.fahrenheit = tempInFahrenheit;
    dataToBeOutput.kelvin = tempInKelvin;
}

function getTypeOfWeather(data, dataToBeOutput) {
    const weatherTypesCheck = ['Rain', 'Drizzle', 'Snow', 'Thunderstorm'];
    dataToBeOutput.typeOfWeather = data.weather[0].main;
    if (weatherTypesCheck.includes(dataToBeOutput.typeOfWeather)) {
        dataToBeOutput.needCoatUmbrella = 'yes';
    } else {
        dataToBeOutput.needCoatUmbrella = 'no';
    }
}

function outputResults(dataToBeOutput) {
    console.log(`
    The weather is:
    Celsius = ${dataToBeOutput.celsius} degrees, Fahrenheit = ${dataToBeOutput.fahrenheit} degrees, Kelvin = ${dataToBeOutput.kelvin} degrees.
    The sun will rise at ${dataToBeOutput.sunrise}, and the sun will set at ${dataToBeOutput.sunset}.
    The wind is blowing from the ${dataToBeOutput.windDirection}.
    The type of weather is ${dataToBeOutput.typeOfWeather}.
    ${dataToBeOutput.needCoatUmbrella === 'yes' ? 'You should take an umbrella or a coat' : 'You dont need an umbrella or coat'};`);
}

main();