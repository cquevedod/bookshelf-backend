const jwt = require('jsonwebtoken');
const moment = require('moment');

exports.createToken = function (user) {
  const payload = {
    id: user._id,
    email: user.email,
    iat: moment().unix() //token date
  };

  return jwt.sign(payload,
    process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};

exports.decodeToken = function (token) {
  const tokenParsed = token.replace(/['"]+/g, "");
  try {
    return jwt.verify(tokenParsed, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    console.log(error);
    return res.status(401).send({ description: `${error}` })
  }
}

