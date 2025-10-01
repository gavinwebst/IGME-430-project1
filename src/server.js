const http = require('http');
const books = require('../data/books.json');
const query = require('querystring');
const jsonHandler = require('./jsonResponses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

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

  jsonHandler.getBookTitles()


http.createServer().listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
  jsonHandler.getBookTitles(request, response)
});