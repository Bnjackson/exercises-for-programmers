const readlineSync = require('readline-sync');

function getUserItems() {
    const items = [];
    let anotherItem;
    do {
        let itemPriceQuantity = []; 
        const itemQuantity = Number(readlineSync.question('What is the quantity of the item? '));
        const itemPrice = Number(readlineSync.question('What is the price of items? '));
        if (!checkInputsAreNums(itemQuantity, itemPrice)) {
            console.log('Please enter numbers');
            break;
        }
        itemPriceQuantity.push(itemQuantity, itemPrice);
        items.push(itemPriceQuantity);
        anotherItem = readlineSync.question('Do you want to enter another item? Enter either yes or no ');
    } while (anotherItem !== 'no');
    function checkInputsAreNums(quantity, price) {
        if (!isNaN(quantity) && !isNaN(price)) {
            return true;
        } else {
            return false;
        }
    }
    calcSubtotal(items);
}

function calcSubtotal(items) {
    let subtotal = 0;
    for(let i = 0; i < items.length; i++) {
        let itemTotalPrice = items[i][0] * items[i][1];
        subtotal += itemTotalPrice;
    }
    calcTotalAndVat(subtotal)
}

function calcTotalAndVat(subtotal) {
    const vatRate = 20;
    const vat = (vatRate / 100) * subtotal;
    const totalCost = subtotal + vat;
    console.log(`Subtotal: £${subtotal} VAT: £${vat} Total: £${totalCost}`);
}

getUserItems();

