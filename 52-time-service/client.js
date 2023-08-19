'use strict';

const http = require('http');

// Time server 

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/data',
    method: 'GET',
};

const req = http.request(options, res => {
    let responseData = '';

    res.setEncoding('utf8');

    res.on('data', chunk => {
        responseData += chunk;
    });
    res.on('end', () => {
        console.log('Server response:', responseData);
    });
});

req.on('error', error => {
    console.log('Error:', error);
});

req.end();

// Quotes server 

const options2 = {
    hostname: 'localhost',
    port: 3001,
    path: '/data',
    method: 'GET',
};

const req2 = http.request(options2, res => {
    let responseData = '';

    res.setEncoding('utf8');

    res.on('data', chunk => {
        responseData += chunk;
    });
    res.on('end', () => {
        console.log('Server response:', responseData);
    });
});

req2.on('error', error => {
    console.log('Error:', error);
});

req2.end();