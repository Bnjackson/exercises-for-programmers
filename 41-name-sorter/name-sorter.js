'use strict';
const fs = require('fs');

function getDataFromFile() {
    fs.readFile('unsorted-names.txt', 'utf8', (err, data) => {
        if(err) {
            console.error('Error reading unsorted-names.txt', err);
        } else {
            sortData(data);
        }
    })
}

function sortData(data) {
    const dataInArr = convertDataToArr(data.split('\r\n'));
    //Comparison only works if I remove the '\r' otherwise will not sort array at all
    dataInArr.sort((a, b) => {
        const secondNameA = a[1];
        const secondNameB = b[1];
        return secondNameA.localeCompare(secondNameB);
    });
    console.log(dataInArr)
    function convertDataToArr(dataInLines) {
        const dataInArr = [];
        dataInLines.forEach(line => {
            const [lastName, firstName] = line.split(', ');
            dataInArr.push([firstName, lastName]); 
        });
        return dataInArr;
    }
    outputData(dataInArr.join('\r\n'));
}

function outputData(sortedData) {
    fs.writeFile('sorted-names.txt', sortedData, 'utf-8', err => {
        if (err) {
            console.error('Error writing to output file:', err);
            process.exit(1);
        }
    });
    console.log('File has been processed and written successfully!');
}

getDataFromFile();