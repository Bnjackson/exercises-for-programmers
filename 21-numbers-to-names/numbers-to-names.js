const readlineSync = require('readline-sync');

const months = {
    monthsInENGLISH : {
        1 : 'January',
        2 : 'February',
        3 : 'March',
        4 : 'April',
        5 : 'May',
        6 : 'June',
        7 : 'July',
        8 : 'August',
        9 : 'September',
        10 : 'October',
        11 : 'Novemeber',
        12 : 'December'
    },
    monthsInITALIAN : {
        1 : 'gennaio',
        2 : 'febbraio',
        3 : 'marzo', 
        4 : 'aprile',
        5 : 'maggio',
        6 : 'giugno',
        7 : 'luglio',
        8 : 'agosto',
        9 : 'settembre',
        10 : 'ottobre',
        11 : 'novembre',
        12 : 'dicembre'
    },
    monthsInSPANISH : {
        1 : 'enero',
        2 : 'febrero', 
        3 : 'marzo',
        4 : 'abril',
        5 : 'mayo', 
        6 : 'junio',
        7 : 'julio',
        8 : 'agosto', 
        9 : 'septiembre',
        10 : 'octubre',
        11 : 'noviembre',
        12 : 'diciembre'
    },
    monthsInGERMAN : {
        1 : 'Januar',
        2 : 'Februar',
        3 : 'März',
        4 : 'April',
        5 : 'May',
        6 : 'Juni',	
        7 : 'Juli',
        8 : 'August',
        9 : 'September',
        10 : 'Oktober',
        11 : 'November',
        12 : 'Dezember'
    }
};

function getUserLanguage() {
    const userLanguage = readlineSync.question('What language would you like to choose? Either "english", "spanish", "italian" or "german" ').toUpperCase();
    if (userLanguage === 'ENGLISH' || userLanguage === 'SPANISH' || userLanguage === 'ITALIAN' || userLanguage === 'GERMAN') {
        const objectName = `monthsIn${userLanguage}`;
        getUsersNumber(objectName)
    } else {
        console.log('Please enter your choice as one of the 4 possible langauges.');
        getUserLanguage()
    }
    function getUsersNumber(obj) {
        const usersNumber = Number(readlineSync.question('Please enter a number from 1 - 12 '));
        const month = months[obj][usersNumber];
        if (month) {
            outputMonth(userLanguage, usersNumber, month);
        } else {
            console.log('Numbers must be between 1 - 12');
            getUsersNumber(obj);
        }
    }
}

function outputMonth(langauge, num, month) {
    console.log(`You chose ${langauge} as your language, you chose ${num} as your number. The corresponding month is ${month}.`)
}

getUserLanguage();