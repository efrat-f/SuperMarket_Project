var jwt = require('jsonwebtoken');
var config = require('./config');

const token = {
  createToken: (req) => {
    return jwt.sign({ userId: req.body.userId }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

  },

  checkToken: (req, res, next) => {
    var token = req.headers['token'];
    if (!token) return res.status(400).send({err: 'No token provided.'});

    jwt.verify(token, config.secret, function (err) {
      if (err) return res.status(600).send({err: 'Failed to authenticate token.'});

      else next()
    })
  }
}
module.exports = token;
//module.exports = checkToken;
