//Version 1

const usersName = prompt('What is your name?');
console.log(`Hello, ${usersName}, nice to meet you!`);

//version 2 - without using variables

console.log(`Hello, ${prompt('What is your name?')}, nice to meet you!`);

//Version 3 - a version with different repsonses for different names 

function outputNameLength(name) {
    return `Your names length is ${name.length} letters`;
}

console.log(outputNameLength(usersName));