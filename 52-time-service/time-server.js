'use stict';

const http = require('http');

const currentTime = () => {
    const date = new Date;
    const currentTime = {
    message : `The current time is ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}, the current date is ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    };
    return currentTime;
};

const server = http.createServer((req, res) => {
    if (req.url === '/data') {
        res.writeHead(200, { 'Content-Type': 'application/json'});
        const data = JSON.stringify(currentTime());
        res.end(data);
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});