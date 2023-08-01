`use strict`;

const fs = require('fs');

function getDatafromFile() {
    fs.readFile('records.csv', 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading records.csv', err);
        } else {
            formatData(data);
        }
    });
}

function formatData(data) {
    const formattedData = convertDataToArray(data.split('\r\n'));
    console.log(formattedData);
    function convertDataToArray(dataInLines) {
        let dataInArr = [];
        dataInLines.forEach(line => {
            const [lastName, firstName, salary] = line.split(',');
            dataInArr.push([lastName, firstName, salary]);
        });
        return dataInArr;
    }
    sortDataBySalary(formattedData)
}

function sortDataBySalary(formattedData) {
    const sortedData = formattedData.sort((a, b) => {
        const salaryA = a[2];
        const salaryB = b[2];
        if (salaryA > salaryB) {
            return -1;
        } else if (salaryA < salaryB) {
            return 1;
        } else {
            return 0
        }
    })
    outputSortedData(sortedData);
}

function outputSortedData(sortedData) {
    console.table(sortedData)
}

getDatafromFile();