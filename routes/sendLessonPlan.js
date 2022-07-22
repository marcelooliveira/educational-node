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

  const lessonPlan = { thumbnail: "https://www.python.org/static/community_logos/python-logo-master-v3-TM-flattened.png", course: "Python", teacher: "Alice Smith", class: "Variables", objectives: "Learn how to create and use a Python variable, a symbolic name that is a reference or pointer to an object." };
  // var data = getLessonPlanTemplatedMessageInput(process.env.RECIPIENT_WAID, templateName);
  
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



