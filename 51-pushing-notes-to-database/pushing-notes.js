'use strict';

const { read } = require('fs');
const mysql = require('mysql');
const readlineSync = require('readline-sync');



function mainMenu() {
    console.log(
    `This program will store your added notes to a local database for you to view:
    The commands are:
    add - add a new note,
    view - view a specific note,
    view all - view all added notes`);
    const userCommand = readlineSync.question(`Input a command `).toLowerCase();
    if (userCommand === 'add') {
        addNote();
    } else if (userCommand === 'view') {
        viewNote();
    } else if (userCommand === 'view all') {
        viewAllNotes();
    } else {
        console.log(`${userCommand} is not a recognized input.`);
    }
}

function addNote() {
    console.log('add');
}

function viewNote() {
    console.log('view');
}

function viewAllNotes() {
    console.log('view all');
}

mainMenu();