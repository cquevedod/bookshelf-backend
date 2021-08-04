
const express = require('express');
const cors = require('cors');

const app = express();
const data = require('./populatedb');
const error = require('./middlewares/error')

/*load paths*/
const user_routes = require('./routes/userRoute');
const book_routes = require('./routes/bookRoute');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use('/api', user_routes);
app.use('/api', book_routes);
app.use(error);

app.get('/test', (req, res) => {
  res.status(200).send({ message: 'Test succesful' })
});

app.get('/api/populatedb', (req, res) => {
  data.populateDB(req, res);
});

module.exports = app;