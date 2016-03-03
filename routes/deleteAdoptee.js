var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var join = path.join;
var Adoptee  = require('../app/models/adoptee');

router.post('/', function(req, res, next) {

  Adoptee.findOne({_id: req.body._id}, function (error, adoptee){

		// for (var i = 0; i < adoptee.photos.length; i++) {
	 //  	  fs.unlinkSync('public/images/uploads/' + adoptee.photos[i]);
		// }

     adoptee.remove();
	 res.json({"success" : "Deleted Successfully", "id": "0", "status" : 200});

    });

});

module.exports = router;
