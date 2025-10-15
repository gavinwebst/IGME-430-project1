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

  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    try{
      request.body = JSON.parse(bodyString);
    }
    catch{
    request.body = query.parse(bodyString);
    }

    handler(request, response);
  });
};

const handlePost = (request, response, parsedURL) => {
  if(parsedURL.pathname === '/addBook'){
    parseBody(request, response, jsonHandler.addBook);
  } else if (parsedURL.pathname === '/addRating'){
    parseBody(request, response, jsonHandler.addRating);
  }
}

  const handleGet = (request, response, parsedURL) => {
    if(parsedURL.pathname === '/style.css'){
      htmlHandler.getCSS(request, response);
    }else if(parsedURL.pathname === '/docs'){
      htmlHandler.getDocs(request, response);
    } else if(parsedURL.pathname === '/getBooks'){
      jsonHandler.getBooks(request, response);
    } else if(parsedURL.pathname === '/findByAuthor'){
      jsonHandler.findByAuthor(request, response);
    } else if(parsedURL.pathname === '/findByTitle') {
      jsonHandler.findByTitle(request, response);
    } else if(parsedURL.pathname === '/bookCountries'){
      jsonHandler.bookCountries(request, response);
    } else {
      htmlHandler.getIndex(request, response);
    }
  }


const onRequest = (request, response) => {
  const protocol = request.connection.encryped ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

  request.query = Object.fromEntries(parsedUrl.searchParams);

  if(request.method === 'POST'){
    handlePost(request, response, parsedUrl);
  } else {
    handleGet(request, response, parsedUrl);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
