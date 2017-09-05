const jwt = require('jwt-simple');
const User = require('../models/user');
const keys = require('../config/dev');

function tokenForUser(user) {
  const timestamp = new Date().getTime();

  // Object is a payload that come to passport strategy
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.secret);
}

exports.signin = (req, res, next) => {
  // If user was found, passport add user to ther request
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    const user = new User({
      email,
      password
    });

    user.save(err => {
      if (err) {
        return next(err);
      }

      res.json({ token: tokenForUser(user) });
    });
  });
};
