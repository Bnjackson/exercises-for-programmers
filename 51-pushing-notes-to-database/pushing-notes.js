'use strict';

const mysql = require('mysql');
const readlineSync = require('readline-sync');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.HOSTNAME,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const connectToDatabase = () => {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                reject(err);
            } else {
                console.log(`Connected to database ${process.env.DATABASE}`);
                resolve();
            }
        });
    });
};

const createNotesTable = () => {
    return new Promise((resolve, reject) => {
        connection.query(`
            CREATE TABLE IF NOT EXISTS notes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                content TEXT
            );
        `, (err) => {
            if (err) {
                reject(err);
            } else {
                console.log('Notes table created');
                resolve();
            }
        });
    });
};

const main = async () => {
    try {
        await connectToDatabase();
        await createNotesTable();
        await mainMenu();
        connection.end();
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

const mainMenu = async () => {
    console.log(
        `This program will store your added notes to a local database for you to view:
        The commands are:
        add - add a new note,
        view - view notes,
        delete - deletes all notes,
        exit - exit the program`
    );
    const userCommand = readlineSync.question(`Input a command `).toLowerCase();
    
    switch (userCommand) {
        case 'add':
            await addNote();
            break;
        case 'view':
            await viewNotes();
            break;
        case 'delete':
            await deleteNotes();
            break;
        case 'exit':
            console.log('Goodbye!');
            break;
        default:
            console.log(`${userCommand} is not a recognized input.`);
    }

    const repeat = readlineSync.keyInYN('Do you want to enter another command?');
    if (repeat) {
        await mainMenu();
    }
};

const addNote = async () => {
    console.log('add');
    const note = readlineSync.question('Enter your note: ');
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO notes (content) VALUES (?)', [note], (err) => {
            if (err) {
                reject(err);
            } else {
                console.log('Note added successfully');
                resolve();
            }
        });
    });
};

const viewNotes = async () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM notes', (err, results) => {
            if (err) {
                reject(err);
            } else {
                console.log('Notes:');
                results.forEach(note => {
                    console.log(`- ${note.content}`);
                });
                resolve();
            }
        });
    });
};

const deleteNotes = async () => {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM notes', (err) => {
            if (err) {
                reject(err);
            } else {
                console.log('All notes deleted');
                resolve();
            }
        });
    });
};

main();