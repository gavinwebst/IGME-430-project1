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
  const content = books.map((b) => `${b.title} by ${b.author}, pages: ${b.pages}`);
  respondJSON(request, response, 200, content);
};

// using a query to find a book from the author from the data set
const findByAuthor = (request, response) => {
  if (!request.query.author) {
    const content = {
      Error: 'No books with this Author',
      id: 'AuthorNotFound',
    };
    return respondJSON(request, response, 404, content);
  }

  const book = books.filter((x) => x.author.includes(request.query.author));
  return respondJSON(request, response, 200, book);
};

// using a query to find a book from the title from the data set
const findByTitle = (request, response) => {
  if (!request.query.title) {
    const content = {
      message: 'No Book Found with that Title',
      id: 'bookTitleNotFound',
    };
    return respondJSON(request, response, 404, content);
  }
  const book = books.filter((x) => x.title.includes(request.query.title));
  return respondJSON(request, response, 200, book);
};

// sets the user a list of all the countries the books are from
const bookCountries = (request, response) => {
  const country = books.map((x) => x.country).filter((name, index, self) => self.indexOf(name) === index);

  respondJSON(request, response, 200, country);
};

// POST METHODs

const addBook = (request, response, body) => {
  // Required fields
  const required = ['title', 'author', 'pages', 'country'];
  const missing = required.filter((field) => !body[field]);
  if (missing.length > 0) {
    return respondJSON(request, response, 400, {
      error: `Missing fields: ${missing.join(', ')}`,
      id: 'missingFields',
    });
  }

  // Add new book
  const newBook = {
    title: body.title,
    author: body.author,
    pages: Number(body.pages),
    country: body.country,
  };
  books.push(newBook);

  return respondJSON(request, response, 201, {
    message: 'Book added successfully!',
    book: newBook,
  });
};

const addRating = () => {

};

module.exports = {

  getBooks,
  findByAuthor,
  findByTitle,
  bookCountries,
  addBook,
  addRating,

};
