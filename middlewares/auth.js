
const jwt = require('jsonwebtoken');
const moment = require('moment');
const msg = require('../controllers/statusMsg');

module.exports = function (req, res, next) {
  if (!req.headers['authorization'].split(' ')[1]) {
    return res
      .status(401)
      .send('Access denied. No token provided');
  }
  //const token = req.headers['authorization'].replace(/['"]+/g, "");
  const token = req.headers['authorization'].split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send(msg.unAuthorized('Token expired'));
    }

    return res.status(403).send({ description: `${error.name}` });
  }
  next();
};


