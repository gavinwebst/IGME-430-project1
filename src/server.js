const http = require('http');
const books = require('../data/books.json')
const query = require('querystring')

/** 
 * Possible EndPoints
 * 
 * get book by author (GET,HEAD)
 * get book by title (GET,HEAD,QUERY)
 * get book by language (GET,HEAD)
 * get book by country (GET, HEAD)
 * 
 * POST METHOD
 * Add Review
 * add Book 
 * 
 * */ 




http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
  console.log(books[0].language);
});