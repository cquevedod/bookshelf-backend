const fs = require('fs');
const Books = require('./models/bookModel');
// const bookData = process.env.BOOKS_JSON || 'books.json'

 const bookData = process.env.NODE_ENV === 'production'
   ? 'books.json'
   : process.env.NODE_ENV === 'development'
     ? JSON.parse(process.env.DEV_BOOKS_JSON)
     : 'books.json'

async function getDataFromJSON() {
  const books = await JSON
    .parse(fs.readFileSync(bookData, 'utf8'));
  return books;
}

async function dbHasDocuments(collection) {
  return await collection.exists({ _id: { $exists: true } })
}

function populateDb() {
  getDataFromJSON()
    .then(data => {
      data.books.forEach(book => {
        const newBook = new Books(book);
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

// module.exports = {
//   populateDB
// };
