'use strict';

const fs = require('fs').promises;
const readlineSync = require('readline-sync');

async function readFile(fileLocation) {
    try {
        const fileData = await fs.readFile(fileLocation, 'utf-8');
        return fileData;
    } catch (err) {
        throw new Error(`Error reading file: ${err.message}`);
    }
}

function getWordCount(fileData) {
    let counterArr = fileData.match(/utilize/g);
    return counterArr.length;
}

function findAndReplaceWords(fileData) {
    return fileData.replace(/utilize/g, 'use');
}

async function getUserFileName() {
    const fileName = readlineSync.question('What would you like to call the modified file? ');
    const pattern = /[<>:"/\\|?*]/;
    if (!pattern.test(fileName)) {
        return `${fileName}.txt`;
    } else {
        return getUserFileName()
    }
}

async function writeFile (updatedData, userFileName) {
    fs.writeFile(userFileName, updatedData, (err) => {
        if (err) {
            console.log(`Error writing file: ${err}`);
        } else {
            console.log(`File written successfully`);
        }
    })
}

async function main() {
    const fileLocation = 'input.txt';
    let fileData;
    try {
        fileData = await readFile(fileLocation);
    } catch {
        console.error(err.message)
        return;
    }
    console.log(fileData);
    const wordCount = getWordCount(fileData);
    const updatedData = findAndReplaceWords(fileData);
    console.log(updatedData);
    const userFileName = await getUserFileName();
    await writeFile(updatedData, userFileName);
    console.log(`The number of words changed was ${wordCount}`);
}

main();