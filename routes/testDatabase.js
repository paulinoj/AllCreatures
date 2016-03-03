var Adoptee  = require('../app/models/adoptee');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {


 //  Adoptee.find({}, function(err, adoptees) {
	// if (err) throw err;
	// console.log(adoptees);
 //    // res.writeHead(200, {"Content-Type": "application/json"});
 //    res.json(adoptees);	
 //  });

  Adoptee.find({}).sort('_id').exec(function(err, adoptees) {
	if (err) throw err;
	console.log(adoptees);
    // res.writeHead(200, {"Content-Type": "application/json"});
    res.json(adoptees);	
  });



});

module.exports = router;

