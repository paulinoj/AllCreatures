var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var EMAIL_LOGIN_ID = process.env.EMAIL_LOGIN_ID;
var EMAIL_LOGIN_PASSWORD = process.env.EMAIL_LOGIN_PASSWORD;

var options = {
    service: 'gmail',
    auth: {
        user: EMAIL_LOGIN_ID,
        pass: EMAIL_LOGIN_PASSWORD
    }
  };

var transporter = nodemailer.createTransport(smtpTransport(options));



/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('adoptionApp', { title: 'Express' });
});


router.post('/', function(req, res, next) {
  // console.log(req);
  // res.send('respond with a resource');
  console.log(req.body);


var fields = [{question: "Name",
response: "inputName"},
{question: "Spouse/Partner",
response: "inputSpouse"},
{question: "Address",
response: "inputAddress"},
{question: "Do You Own or Rent?",
response: "ownOrRent"},
{question: "Dwelling type?",
response: "dwellingType"},
{question: "How long?",
response: "inputHowLong"},
{question: "If you rent, does owner/management allow animals?",
response: "animalsAllowed"},
{question: "Is it written in your lease?",
response: "allowedInLease"},
{question: "Age Range",
response: "ageRange"},
{question: "Partner's Age Range",
response: "spouseAgeRange"},
{question: "Interested in fostering or adopting a DOG?",
response: "fosterOrAdopt"},
{question: "Sex?",
response: "Sex"},
{question: "Specific Breed",
response: "breed"},
{question: "Special Characteristics",
response: "specialChar"},
{question: "Are you applying for a specific animal?",
response: "specificAnimal"},
{question: "If so, who?",
response: "who"},
{question: "Approximate Weight Range",
response: "weightRange"},
{question: "Approximate Age Range",
response: "approxAgeRange"},
{question: "How soon do you want him/her?",
response: "howSoon"},
{question: "Home Phone",
response: "homePhone"},
{question: "E-Mail Address",
response: "email"},
{question: "Work Phone",
response: "workPhone"},
{question: "Cell Phone",
response: "cellPhone"},
{question: "Why do you want to adopt an animal?",
response: "whyAdopt"},
{question: "Is the animal a gift?",
response: "isGift"},
{question: "Are you familiar with this breed?",
response: "familiarBreed"},
{question: "How many animals have you had in the last 5 years?",
response: "howMany"},
{question: "What kind?",
response: "whatKind"},
{question: "What animals are at home now?",
response: "whatAnimals"},
{question: "Give their species, breed, sex and ages",
response: "animalList"},
{question: "Have they all been neutered?",
response: "neutered"},
{question: "If not, why not?",
response: "whyNotNeutered"},
{question: "What happened to those no longer with you?",
response: "whatHappened"},
{question: "Veterinarian or Pet Hospital Reference",
response: "veterinarian"},
{question: "Personal Reference (please include name(s), city, phone)",
response: "personalReference"},
{question: "# of Adults in the Home",
response: "numAdults"},
{question: "# of Children in the Home",
response: "numChildren"},
{question: "Children: Males Names & Ages",
response: "childrenMales"},
{question: "Children: Females Names & Ages",
response: "childrenFemales"},
{question: "Grandkids? Ages",
response: "grandKids"},
{question: "Do all members of the household want an animal?",
response: "allWant"},
{question: "Who will be primarily responsible?",
response: "responsible"},
{question: "Does anyone have an allergy?",
response: "allergy"},
{question: "What is your occupation?",
response: "occupation"},
{question: "Location?",
response: "occLocation"},
{question: "What is your partner's occupation?",
response: "partnerOccupation"},
{question: "Location?",
response: "partOccLocation"},
{question: "How many hours are you away from home each day?",
response: "hoursAway"},
{question: "How many hours is your partner away from home each day?",
response: "partnerHoursAway"},
{question: "Where will the animal sleep at night? (Please be specific)",
response: "animalSleep"},
{question: "Where will the animal stay during the day? (Please be specific)",
response: "animalStay"},
{question: "How many stories in your home/apartment?",
response: "stories"},
{question: "Do you have screens on your windows?",
response: "screens"},
{question: "Do you have a yard?",
response: "yard"},
{question: "Do you have a fence?",
response: "fence"},
{question: "How high?",
response: "fenceHeight"},
{question: "Do you have a patio?",
response: "patio"},
{question: "Is it enclosed?",
response: "patioEnclosed"},
{question: "When you go away, who will care for the animal?",
response: "whoCare"},
{question: "Do you agree to keep dog on a LEASH when outdoors in unprotected area?",
response: "keepOnLeash"},
{question: "How long do you expect to keep this animal?",
response: "howLongKeep"},
{question: "Under what circumstances would you surrender him/her?",
response: "surrenderCircumstances"},
{question: "If dog needs obedience training, are you willing and able to do this?",
response: "obedienceTraining"},
{question: "If dog needs house training, are you willing and able to do this?",
response: "houseTraining"},
{question: "If your animal had an emergency or serious illness, how much would you be able and/or willing to spend on his/her care?",
response: "careAmount"},
{question: "Would you object to an All Creatures’ representative visiting your home prior to or following an adoption?",
response: "homeVisit"},
{question: "Would you be willing to foster an animal while waiting for your preferred, permanent pet?",
response: "willingFoster"},
{question: "Where did you learn about All Creatures?",
response: "whereLearn"},
{question: "Where?",
response: "whereFlyer"},
{question: "Referred by?",
response: "referredBy"},
{question: "Other site",
response: "otherPetSite"}];


  var htmlOutput = "";

  var formAnswer = "";

  for (var i = 0; i < fields.length; i++) {
    if (!req.body.hasOwnProperty(fields[i]["response"])) {
      formAnswer = "";
    }
    else
    {
      formAnswer = req.body[fields[i]["response"]];
    }
    htmlOutput = htmlOutput + "<div style='padding-top: 10px; font-size: 13px'><b>" + fields[i]["question"] + ":  <span style='color: red'>" + 
                 formAnswer + "</span></b></div>";
  }


  var applicant = "";
  if (req.body.hasOwnProperty("inputName")) {
    applicant = req.body["inputName"];
  }
  else
  {
    applicant = "ANONYMOUS";
  }

var mailOptions={
   from: "allcreaturesmarin@gmail.com",
   to : "lyncat1@sbcglobal.net",
   subject : "ADOPTION APPLICATION FROM:  " + applicant,
   html: htmlOutput
}


console.log(mailOptions);
transporter.sendMail(mailOptions, function(error, response){
if(error){
console.log(error);
return next(error)
// res.end('{"error" : "Error", "status" : 500}');
}else{
console.log("Message sent: " + response.message);
res.end('{"success" : "Updated Successfully", "status" : 200}');
}
});



});

module.exports = router;
