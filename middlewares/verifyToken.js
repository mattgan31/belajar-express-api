const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretKey');

function verifyToken(req, res, next) {

  const authHeader = req.headers['authorization'];
  const token = authHeader || authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    console.log(err);

    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    req.user = decoded;
    next();
  });
}


module.exports = verifyToken
