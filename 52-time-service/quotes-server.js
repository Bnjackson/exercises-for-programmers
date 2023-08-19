'use strict';

const http = require('http');

const getRandomQuote = () => {
    const quotesArr = ['A rose by any other name would smell as sweet. - William Shakespeare.',
    	'All that glitters is not gold.	- William Shakespeare',
        'Eighty percent of success is showing up. - Woody Allen',
        'Frankly, my dear, I don\'t give a damn. - Rhett Butler',
        'Go ahead, make my day. - Harry Callahan',
        'Hell is other people. - Jean-Paul Sartre',
        'Life is like a box of chocolates. You never know what you’re gonna get. - Forrest Gump',
        'Two roads diverged in a wood, and I, I took the one less travelled by, and that has made all the difference. - Robert Frost'
    ];
    const randomQuote = {'random quote': quotesArr[Math.floor(Math.random() * 8)]};
    return randomQuote;
}

const server = http.createServer((req, res) =>{
    if (req.url === '/data') {
        res.writeHead(200, { 'Content-Type': 'application/json'});
        const data = JSON.stringify(getRandomQuote())
        res.end(data);
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
})

const port = 3001;
server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});