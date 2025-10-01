const books = require('../data/books.json')

const respondJSON = (request, response, status, object) => {
    const content = JSON.stringify(object);

    const headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(content, 'utf8'),
    };

    response.writeHead(status,headers);

    if(request.method !== 'HEAD') {
        response.write(content);
    }

    response.end();
}

const getBookTitles = (request, response) => {
    const content = {}
    for( x in books => {
        
    });
}