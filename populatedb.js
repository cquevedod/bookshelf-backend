const fs = require('fs');
const fetch = require('node-fetch');
const Books = require('./models/bookModel');
const { utils: {
  assignBookshelf,
  createApiUrl
} } = require('./utils');

async function fetchBooks(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
}

async function dbHasDocuments(collection) {
  return await collection.exists({ _id: { $exists: true } })
}

function populateDb() {
  const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=subject:";
  const topics = ["FICTION", "HORROR"];
  const urls = createApiUrl(apiUrl, ...topics);
  console.log(urls)
  for (let url of urls) {
    fetchBooks(url)
      .then(data => {
        if (!data.items || data.items.length === 0) {
          return console.log('request without books');
        }
        data.items.map(book => {
          return new Books({
            id: book.id,
            title: book.volumeInfo?.title,
            publishedDate: book.volumeInfo?.publishedDate,
            authors: book.volumeInfo?.authors,
            pageCount: book.volumeInfo?.pageCount,
            description: book.volumeInfo?.description,
            averageRating: book.volumeInfo?.averageRating,
            ratingsCount: book.volumeInfo?.ratingsCount,
            imageLinks: book.volumeInfo?.imageLinks,
            bookShelf: assignBookshelf(),
            industryIdentifiers: book.volumeInfo?.industryIdentifiers
          }).save();

        });
        console.log('db populated with books');
      })
      .catch(error => {
        console.log('Error: ', error.message)
      });
  }
}

(async function () {
  console.log('Database has books: ', await dbHasDocuments(Books))
  const dbHasBooks = await dbHasDocuments(Books);
  if (!dbHasBooks) populateDb()
})()

module.exports = {
  populateDb
};
