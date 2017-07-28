const express = require('express');
const validator = require('validator');
var   models = require('../models/index');
var   bcrypt = require('bcrypt');
var   Puid = require('puid');
var   jwt = require('jsonwebtoken');
var   passport = require('passport');

var   env       = process.env.NODE_ENV || 'development';
var   config    = require(__dirname + '/../config/config.json')[env];

const router = new express.Router();

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */

function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.first_name !== 'string' || payload.first_name.trim().length === 0) {
    isFormValid = false;
    errors.first_name = 'Please provide a valid first name.';
  }

  if (!payload || typeof payload.last_name !== 'string' || payload.last_name.trim().length === 0) {
    isFormValid = false;
    errors.last_name = 'Please provide a valid last name.';
  }

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a valid email.';
  }

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide a correct username.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  console.log("Birthday: ", payload.birthday);
  if (!payload || payload.birthday === 'undefined') {
    isFormValid = false;
    errors.birthday = 'Please provide birth date.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

function findUser(username, callback) {
  try {
    models.Users.findOne({
      where: { username: username,}
    }).then(function(user) {
      if (user) {
        return callback(null, user);
      }
      return callback("user not found", null);
    });
  } catch (ex) {
    return callback(ex);
  }
}

// Register new users
function registerNewUser(req, res) {
  const errors = {};
    findUser(req.body.username, function (err, user) {
      if(user){
        errors.username = 'Username already exists.';
        return res.status(400).json({
          success: true,
          errors : errors,
        });
      }

      var user_token = jwt.sign({user: req.body.username}, config.jwtSecret, {
        expiresIn: '1d',
        algorithm: 'HS256'
      });

      console.log("adding new user with token: ", user_token);

      var puid = new Puid();
      var user_pid = puid.generate();

      console.log("BODY: ", req.body);

      models.Users.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth_date: req.body.birthday.substr(0,9),
        email: req.body.email,
        token : user_token,
        pid : user_pid,
        type: 'USER'
      }).then(function (user) {
        res.cookie('access_token', user.token, {secure: config.secure_cookie });
        return res.status(200).json({
          success: true,
          errors : errors,
        });

      }).catch(function (err) {
        console.log("error in creating user ", err);
        res.json({ success: false, message: 'Error occurred while creating a user.' });
      });
    });
}

router.post('/signup', (req, res) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return registerNewUser(req, res);
});


/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide your username.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  return {
    success: isFormValid,
    errors
  };
}

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/login', (req, res) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      errors: validationResult.errors
    });
  }

  return findUser(req.body.username, function (err, user) {
    const errors = {};
    if(!user){
      errors.username = 'User not found.';
      return res.status(400).json({
        success: false,
        errors : errors,
      });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      errors.password = 'Invalid password.';
      return res.status(400).json({
        success: false,
        errors : errors,
      });
    }

    // invalid token - synchronous
    try {
      jwt.verify(user.token, config.jwtSecret);
      res.cookie('access_token', user.token, {secure: config.secure_cookie });
      return res.status(200).json({
        success: true,
        errors : errors,
      });
    } catch(err) {
      // err
      var user_token = jwt.sign({ user: req.body.username }, config.jwtSecret, {
        expiresIn: '1d',
        algorithm: 'HS256'
      });

      models.Users.update({
        'token': user_token
      }, {
        where: { username: user.username }
      }).then(function (user) {
        if(user) {
          res.cookie('access_token', user.token, {secure: config.secure_cookie });
          return res.status(200).json({
            success: true,
            errors : errors,
          });
        }
      }).catch(function (err) {
        console.log("Error while updating user ", err);
        res.json({ success: false, message: 'Error occurred while updating user info.' });
      });
    }
  });
});

// logout
router.get("/logout", passport.authenticate('jwt', { session: false }), function(req, res, next) {
  res.clearCookie("access_token");
  res.redirect('/');
});

module.exports = router;
