'use strict';

const fs = require('fs').promises;

async function getFileData(fileLocation) {
    try {
        const fileData = await fs.readFile(fileLocation, 'utf-8');
        console.log('File is read successfully');
        return fileData;
    } catch (err) {
        throw new Error(`Error reading file: ${err.message}`);
    }
}

function countWordFrequency(fileData) {
    const fileDataWithoutPunctuation = removePunctuation(fileData); 
    //Removing punctuation as otherwise it is counted as a word 
    let formattedData = formatData(fileDataWithoutPunctuation)
    const wordFrequencyObj = {};
    for (let i = 0; i < formattedData.length; i++) {
        if (wordFrequencyObj[formattedData[i]]) {
            wordFrequencyObj[formattedData[i]] += '*';
        } else {
            wordFrequencyObj[formattedData[i]] = '*';
        }
    }
    function removePunctuation(inputString) {
        return inputString.replace(/[^\w\s]|_/g, "");
    }
    function formatData(inputData) {
        //Converts data into an array and remove \r\n as otherwise messes up the loop
        inputData = inputData.split(' ');
        inputData = inputData.map(str => str.replace(/[\r\n]/g, ''));
        return inputData;
    }
    return wordFrequencyObj;
}

function sortDataByFrequency(wordFrequencyObj) {
    let wordFrequencyArr = Object.entries(wordFrequencyObj);
    wordFrequencyArr.sort((a, b) => {
        const firstFrequency = a[1].length;
        const secondFrequency = b[1].length;
        if (firstFrequency > secondFrequency) {
            return -1;
        } else if (secondFrequency > firstFrequency) {
            return 1;
        } else {
            return 0;
        }
    });
    return wordFrequencyArr;
}

function convertToObj(sortedData) {
    const resultObject = sortedData.reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
      return resultObject;
}

async function main(fileLocation) {
    let fileData;
    try {
         fileData = await getFileData(fileLocation);
    } catch (err) {
        console.error(err.message)
        return;
    }
    const wordFrequencyObj = countWordFrequency(fileData)
    const sortedData = sortDataByFrequency(wordFrequencyObj);
    console.log(convertToObj(sortedData));
}

main('words.txt');
// main('macbeth.txt');