'use strict';

const fs = require('fs');
const readlineSync = require('readline-sync');

function getJsonFile() {
    fs.readFile('products.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Error reading throught file', err);
            return;
        } 
        try {
            const jsonData = JSON.parse(data);
            getUserSearch(jsonData);
        } catch (err) {
            console.log('Error passing JSON data', err);
        }
    });
}

function getUserSearch(jsonData) {
    const userSearch = readlineSync.question('What is the products name? ').toLowerCase();
    if (!checkUserSearch()) {
        console.log('Sorry that product could not be found in our inventory.');
        addNewProduct(userSearch, jsonData);
    }
    function checkUserSearch() {
        for (let i = 0; i < jsonData.fruits.length; i++) {
            if (jsonData.fruits[i]['name'].toLowerCase() === userSearch) {
                outputProduct(jsonData.fruits[i]);
                return true;
            }
        }
        return false;
    }
}

function addNewProduct(newProduct, products) {
    const userChoice = readlineSync.question('Would you like to add that product to our inventory? Enter either "yes" or "no" ').toLowerCase();
    if(userChoice === 'yes') {
        getProductInfo();
        console.log(products);
        updateJsonFile(products);
        outputProduct(products.fruits[products.fruits.length - 1]);
    } else if (userChoice === 'no') {
        console.log('Thanks for using the program.')
    } else {
        console.log('Input must either be "yes" or "no"');
        addNewProduct(newProduct, products);
    }
    function getProductInfo() {
        const productPrice = Number(readlineSync.question('What is the price of the new product? Input must be a number '));
        const productQuantity = Number(readlineSync.question('What is the quantity of the product? Input must be a number '));
        function checkInputsAreNumbers() {
            if (!productPrice, !productQuantity) {
                getProductInfo();
            } else {
                products.fruits.push({name : newProduct, price : productPrice, Quantity : productQuantity});
            }
        }
        checkInputsAreNumbers();
    }
}

function updateJsonFile(products) {
    const updatedJsonFile = JSON.stringify(products, null, 2);
    fs.writeFile('products.json', updatedJsonFile, 'utf-8', (err) => {
        if (err) {
            console.log('Error writing to a file', err);
        } else {
            console.log('File updated successfully');
        }
    });
}

function outputProduct(productLocation) {
    console.log(`Product name : ${productLocation.name}, Product price : £${productLocation.price}, Product Quantity : ${productLocation.Quantity}`);
}
 


getJsonFile();