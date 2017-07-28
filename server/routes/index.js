var express = require('express');
var passport = require('passport');
var router = express.Router();
var jwt = require('jwt-simple');

require('../config/passport')(passport);

/*
router.get('/', function(req, res, next) {
    console.log("main url...");
  if(req.cookies['access_token']) {
      res.redirect('/chat');
      console.log("redirecting to chat");
  }
  else
      res.redirect('/'); // client side routing
  return res.status(200).json({
      success: true,
      errors : errors,
  });
});
*/

router.get("/chat", passport.authenticate('jwt', { session: false }), function(req, res) {
  res.redirect('/#/chat'); // client side routing
  return res.status(200).json({
      success: true,
      errors : errors,
  });
});

module.exports = router;
