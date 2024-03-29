function ok(data, msg = 'Success!') {
  const response = {
    status: 200,
    description: 'OK',
    message: msg,
    items: data.length,
    data
  };
  return response;
}

function okUser(msg, registeredUser) {
  const response = {
    status: 200,
    description: 'OK',
    message: msg,
    user: registeredUser
  };
  return response;
}

function lentTheBook(book, msg) {
  const response = {
    status: 200,
    description: 'OK',
    message: msg,
    items: book.length,
    bookID: book[0].id,
  };
  return response;
}

function invalidLentDate() {
  const response = {
    status: 400,
    description: 'Bad request',
    message: 'Please enter a valid date',
    valid_date_format: 'YYYY-MM-DD',
  };
  return response;
}

function alreadyLentOrNot(book, msg) {
  const response = {
    status: 401,
    description: 'Unauthorized',
    message: msg,
    items: book.length,
    isLent: book[0].isLent,
    bookId: book[0].id,
    title: book[0].title
  };
  return response;
}

function noContent() {
  const response = {
    status: 204,
    description: 'No Content',
    message: 'No books found in the database',
  };
  return response;
}

function badRequest() {
  const result = {
    status: 400,
    description: 'Bad Request',
    message: 'Enter a valid bookshelf!',
    valid_bookshelves: ['Cartagena', 'Medellin',
      'Quito', 'Digital']
  };
  return result;
}

function unAuthorized(book, msg) {
  const response = {
    status: 401,
    description: 'Unauthorized',
    message: msg,
    title: book[0].title,
    bookshelf: book[0].bookShelf,
    id: book[0].id
  };
  return response;
}

function notFound(msg) {
  const response = {
    status: 404,
    description: 'Not Found',
    message: msg
  };
  return response;
}

function internalError(msg) {
  const response = {
    status: 500,
    description: 'Internal Server Error',
    message: msg
  };
  return response;
}

function dataRequired(msg) {
  const response = {
    status: 422,
    description: 'Unprocessable entity',
    message: msg
  };
  return response;
}

function duplEmail(msg) {
  const response = {
    status: 401,
    description: 'Unauthorized',
    message: msg
  };
  return response;
}

module.exports = {
  ok,
  okUser,
  alreadyLentOrNot,
  lentTheBook,
  invalidLentDate,
  noContent,
  badRequest,
  unAuthorized,
  notFound,
  internalError,
  dataRequired,
  duplEmail
};