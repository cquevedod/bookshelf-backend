const winston = require('winston');

module.exports = function () {
    process.on('uncaughtException', (ex) => {
        winston.error(ex.message, ex);
        process.exit(1);
      });
      
      process.on('unhandledRejection', (ex) => {
        winston.error(ex.message, ex);
        process.exit(1);
      });
      
}