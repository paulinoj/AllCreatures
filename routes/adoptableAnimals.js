var express = require('express');
var router = express.Router();

// Added for post route 

var path = require('path');
var fs = require('fs');
var join = path.join;

/* GET home page. */
router.get('/', notLoggedIn, function(req, res, next) {
  res.render('adoptableAnimals', { title: 'Express' });
});

function notLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (!req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/adoptableAnimals_Edit');
}


module.exports = router;
