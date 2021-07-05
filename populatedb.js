const fs = require('fs');
const Books = require('./models/bookModel');
const { utils } = require('./utils');
// const bookData = process.env.BOOKS_JSON || 'books.json'

async function getDataFromJSON() {
  return await JSON.parse(fs.readFileSync('books.json', 'utf8'))
}

async function dbHasDocuments(collection) {
  return await collection.exists({ _id: { $exists: true } })
}

function populateDb() {
  getDataFromJSON()
    .then(data => {
      data.books.forEach(book => {
        const newBook = new Books({
          id: book.id,
          title: book.volumeInfo?.title,
          publishedDate: book.volumeInfo?.publishedDate,
          authors: book.volumeInfo?.authors,
          pageCount: book.volumeInfo?.pageCount,
          description: book.volumeInfo?.description,
          averageRating: book.volumeInfo?.averageRating,
          ratingsCount: book.volumeInfo?.ratingsCount,
          imageLinks: book.volumeInfo?.imageLinks,
          bookShelf: utils.assignBookshelf(),
          industryIdentifiers: book.volumeInfo?.industryIdentifiers
        });
        newBook.save();
      });
      console.log('db populated with books');
    })
    .catch(function (err) {
      console.log('error: ', err);
    });
}

(async function () {
  console.log('dbHasBooks: ', await dbHasDocuments(Books))
  const dbHasBooks = await dbHasDocuments(Books);
  if (!dbHasBooks) populateDb()
})()

module.exports = {
  populateDb
};
