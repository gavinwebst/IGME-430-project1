const http = require('http');
const query = require('querystring');
const books = require('../data/books.json');
const jsonHandler = require('./jsonResponses.js');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

/**
 * Possible EndPoints
 *
 * get book by author (GET,HEAD,QUERY)
 * get book by title (GET,HEAD,QUERY)
 * get all book countries (GET,HEAD)
 * get books (GET, HEAD)
 *
 * POST METHOD
 * Add Review 
 * add Book
 *
 * */

const parseBody = (request, response, handler) => {
  const body = [];

  request.on('error', (err) =>{
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    request.body = query.parse(bodyString);

    handler(request, response);
  });
};

const onRequest = (request, response) => {
  const protocol = request.connection.encryped ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

  request.query = Object.fromEntries(parsedUrl.searchParams);
}

http.createServer().listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
  
});
