var express = require('express');
var router = express.Router();
var fs = require('fs');

// Added for post route 

var path = require('path');
var fs = require('fs');
var join = path.join;

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('adoptableAnimals_Edit', { title: 'Express' });
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/adoptableAnimals');
}


module.exports = router;
