const http = require('http');
const query = require('querystring');
const books = require('../data/books.json');
const jsonHandler = require('./jsonResponses.js');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

/**
 * Possible EndPoints
 *
 * get book by author (GET,HEAD)
 * get book by title (GET,HEAD,QUERY)
 * get book by language (GET,HEAD)
 * get books (GET, HEAD)
 *
 * POST METHOD
 * Add Review
 * add Book
 *
 * */

http.createServer().listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
  const country = books.map((x) => x.country).filter((name, index, self) => self.indexOf(name) === index);

  console.log(country);
});
