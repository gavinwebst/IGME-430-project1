const books = require('../data/books.json');

const respondJSON = (request, response, status, object) => {
  const content = JSON.stringify(object);

  const headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  };

  response.writeHead(status, headers);

  if (request.method !== 'HEAD') {
    response.write(content);
  }

  response.end();
};

// Get a List of All the Book title and Authors
const getBooks = (request, response) => {
  const content = books.map((b) => `${b.title} by ${b.author}`);
  respondJSON(request, response, 200, content);
};

// using a query to find a book from the author from the data set
const findByAuthor = () => {
  if (!request.query.author) {

  }

  const book = books.filter((x) => x.author.includes('queryParam'));
};

// using a query to find a book from the title from the data set
const findByTitle = () => {
  const book = books.filter((x) => x.title.includes('queryParam'));
};

// sets the user a list of all the countries the books are from
const bookCountries = (request, response) => {
  const country = books.map((x) => x.country).filter((name, index, self) => self.indexOf(name) === index);

  respondJSON(request, resposne, 200, country);
};

module.exports = {

  getBooks,
  findByAuthor,
  findByTitle,
  bookCountries,

};
