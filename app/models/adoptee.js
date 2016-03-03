// app/models/adoptee.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our adoptee model
var Schema = mongoose.Schema;

var adopteeSchema = new Schema({
  name        : String,
  description : String,
  photos      : Array,
  adopted     : Boolean,
  created_at  : Date
});

// methods ======================

// checking if password is valid
// adopteeSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };


// on every save, add the date
adopteeSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});





// create the model for users and expose it to our app
module.exports = mongoose.model('Adoptee', adopteeSchema);