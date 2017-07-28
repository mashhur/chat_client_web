var express = require('express');
var router = express.Router();
var models = require('../models/index');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var passport = require('passport');

var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];

// logout
router.get("/logout", passport.authenticate('jwt', { session: false }), function(req, res, next) {
    res.clearCookie("access_token");
    res.redirect('/');
});

/* list view */
router.all('/list', function(req, res) {

});

/* remove view */
router.all('/{id}/remove', function(req, res) {

});

/* update view */
router.all('/{id}/update', function(req, res) {

});

/* detail view */
router.all('/{id}', function(req, res) {

});

module.exports = router;
