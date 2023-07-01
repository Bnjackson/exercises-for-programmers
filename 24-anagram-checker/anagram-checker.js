const readlineSync = require('readline-sync');

function getUserStrings() {
    console.log('Enter two strings and I\'ll tell you if they are anagrams: ');
    const firstString = readlineSync.question('Enter the first string ');
    const secondString = readlineSync.question('Enter the second question ');
    function checkStrings() {
        if (typeof firstString === 'string' && typeof secondString === 'string') {
            checkIfAnagram(firstString, secondString)
        } else {
            console.log('Make sure that your inputs are strings.');
            getUserStrings();
        }
    }
    checkStrings()
}

function checkIfAnagram(str1, str2) {
    if(str1.length === str2.length) {
        const sortedStr1 = str1.split('').sort().join('');
        const sortedStr2 = str2.split('').sort().join('');
        sortedStr1 === sortedStr2 ? outputIfAnagram(true, str1, str2) : outputIfAnagram(false, str1, str2);
    }
    else {
        console.log('Strings not same length');
        outputIfAnagram(false, str1, str2)
    }
}

function outputIfAnagram(isAnagram, str1, str2) {
    if(isAnagram) {
        console.log(`"${str1}" and "${str2}" are anagrams.`);
    } else {
        console.log(`"${str1}" and  "${str2}" are not anagrams.`);
    }
}

getUserStrings();