var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var join = path.join;
var Adoptee  = require('../app/models/adoptee');



router.post('/', function(req, res, next) {
  console.log("UPDATE POST SUCCESSFUL");
  console.log(req.body);
  var addedPhotos = [];
  var deletedPhotos = [];
  if (req.body.hasOwnProperty('addedPhotos')) {
  	addedPhotos = req.body.addedPhotos;
  }
  if (req.body.hasOwnProperty('deletedPhotos')) {
  	deletedPhotos = req.body.deletedPhotos;
  }



  for (var j=0; j < deletedPhotos.length; j++) {
	var deletedPhotoIndex = addedPhotos.indexOf(deletedPhotos[j]);
	if (deletedPhotoIndex !== -1) {
	  addedPhotos.splice(deletedPhotoIndex, 1);
	  var photoToDelete = deletedPhotos.splice(j, 1);
	  // REMOVE photoToDelete FROM TEMP DIRECTORY
	  // fs.unlinkSync('public/images/temp_uploads/' + photoToDelete);
	  j--;
	}
  }

  var adopteeID = req.body._id;

  if (adopteeID.substr(0, 10) === "newAdoptee") {

	var newAdoptee = Adoptee({
	  name        : req.body.changedTitle,
	  description : req.body.changedText,
	  photos      : addedPhotos,
	  adopted     : false
	});
	// save the user
	newAdoptee.save(function(err, savedAdoptee) {
	  if (err) {
	  	throw err;
	  	console.log('ERROR SAVING NEXT RECORD')
	  }
	  else
	  {
		console.log('New Adoptee created!');
	  }
	  res.end(JSON.stringify({"success" : "Updated Successfully", "id": savedAdoptee._id, "status" : 200}));

	});


  }
  else {

	  Adoptee.findById(req.body._id, function(err, adoptee) {
	    if (err) throw err;

		  // change the users location
		adoptee.photos = adoptee.photos.concat(addedPhotos);
		adoptee.description = req.body.changedText;
		adoptee.name = req.body.changedTitle;

		for (var k=0; k < deletedPhotos.length; k++) {
		  var deletedPhotoIndex = adoptee.photos.indexOf(deletedPhotos[k]);
		  if (deletedPhotoIndex !== -1) {
		  	adoptee.photos.splice(deletedPhotoIndex, 1);
	  		// fs.unlinkSync('public/images/uploads/' + deletedPhotos[k]);
		  }
		}

		  // save the user
		adoptee.save(function(err) {
		  if (err) throw err;

		  console.log('Adoptee successfully updated!');
		  res.json({"success" : "Updated Successfully", "id": "0", "status" : 200});

		  });

	  });  

  }
});

module.exports = router;
