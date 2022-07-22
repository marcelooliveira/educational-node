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

  const lessonPlans = [{ course: "Python", thumbnail: "https://www.python.org/static/community_logos/python-logo-master-v3-TM-flattened.png", 
      contents: `*Module 1*: Introduction to Python`
    + `, *Module 2*: Functions, Booleans and Modules`
    + `, *Module 3*: Sequences, Iteration and String Formatting`
    + `, *Module 4*: Dictionaries and Sets`
    + `, *Module 5*: Exceptions`
    + `, *Module 6*: Lambda Functions`
    + `, *Module 7*: Object Oriented Programming`
    + `, *Module 8*: Properties`
    + `, *Module 9*: Iterators`
    + `, *Module 10*: Regular Expressions` },
    { course: "JavaScript", thumbnail: "https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400__340.png", 
    contents: '*Module 1*: Variable declaration'
    + ', *Module 2*: Operators'
    + ', *Module 3*: Control Statements'
    + ', *Module 4*: Error Handling'
    + ', *Module 5*: Understanding arrays'
    + ', *Module 6*: Function Declaration' },
    { course: "C#", thumbnail: "https://docs.microsoft.com/en-us/windows/images/csharp-logo.png", 
      contents: '*Module 1* - Getting Started with C#'
      + ', *Module 2* - .NET Framework'
      + ', *Module 3* - Object Orientated Programming'
      + ', *Module 4* - Variables & Data Types'
      + ', *Module 5* - Operators'
      + ', *Module 6* - Arrays'
      + ', *Module 7* - Iteration'
      + ', *Module 8* - Classes & Objects'
      + ', *Module 9* - Collections' },
    {
      course: "SQL", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png",
      contents: '*Module 1* - SQL Introduction'
      + ', *Module 2* - SQL Database User'
      + ', *Module 3* - SQL Database'
      + ', *Module 4* - SQL Table'
      + ', *Module 5* - SQL Constraints'
      + ', *Module 6* - SQL Keywords'
      + ', *Module 7* - SQL Data Types'
      + ', *Module 8* - SQL Operators'
    }
]

  var data = getLessonPlanTemplatedMessageInput(process.env.RECIPIENT_WAID, templateName
    , lessonPlans[3]);

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



