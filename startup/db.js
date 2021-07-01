const mongoose = require('mongoose');
require('dotenv').config();

function connect(envVar, prodORDev) {
    mongoose.connect(envVar, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
        .then(() => console.log(`Connection to ${prodORDev} database succesful!`))
        .catch(err => console.error(`Error trying to connect to ${prodORDev} MongoDB`, err))
}

module.exports = function () {
    mongoose.Promise = global.Promise;
    process.env.NODE_ENV === 'production'
    ? connect(process.env.PROD_MONGODB_URI, 'prod')
    : process.env.NODE_ENV === 'development'
        ? connect(process.env.DEV_MONGODB_URI, 'dev')
        : connect(process.env.LOCAL_MONGODB_URI, 'local')

}