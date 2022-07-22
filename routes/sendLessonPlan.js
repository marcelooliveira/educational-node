var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
require('dotenv').config()
var { movies } = require('../public/javascripts/movies');
const { sendMessage, getLessonPlanTemplatedMessageInput } = require("../messageHelper");

router.use(bodyParser.json());

router.post('/', function(req, res, next) {
  var movie = movies.filter((v,i) => v.id == req.body.id)[0];

  const templateName = process.env.TEMPLATE_NAME;

  const lessonPlan = { thumbnail: "https://www.python.org/static/community_logos/python-logo-master-v3-TM-flattened.png", course: "Python", 
  contents: `*Lesson 1*: Introduction to Python`
+ `, *Lesson 2*: Functions, Booleans and Modules`
+ `, *Lesson 3*: Sequences, Iteration and String Formatting`
+ `, *Lesson 4*: Dictionaries and Sets`
+ `, *Lesson 5*: Exceptions`
+ `, *Lesson 6*: Lambda Functions`
+ `, *Lesson 7*: Object Oriented Programming`
+ `, *Lesson 8*: Properties`
+ `, *Lesson 9*: Iterators`
+ `, *Lesson 10*: Regular Expressions` };
  
  var data = getLessonPlanTemplatedMessageInput(process.env.RECIPIENT_WAID, templateName
    , lessonPlan);

  sendMessage(data)
    .then(function (response) {
      console.log(response);
      return;
    })
    .catch(function (error) {
      console.log(error);
      console.log(error.response.data);
    });
});

module.exports = router;



