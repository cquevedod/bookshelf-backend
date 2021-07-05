const User = require('./userModel');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = Schema({
  id: {
    type: String,
    unique: true
  },
  title: String,
  publishedDate: String,
  authors: [String],
  pageCount: Number,
  description: String,
  averageRating: Number,
  ratingsCount: Number,
  imageLinks: {
    smallThumbnail: String,
    thumbnail: String
  },
  bookShelf: {
    type: String,
    enum: ['Cartagena', 'Medellin', 'Quito', 'Digital']
  },
  isLent: Boolean,
  returnDate: {
    type: Date,
    trim: true,
  },
  industryIdentifiers: [{}],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: function () { return this.isLent; },
    ref: 'User'
  }
});

module.exports = mongoose.model('Book', BookSchema);
