var express = require('express');
const { lessonPlans } = require("../public/javascripts/lessonPlans");
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
  res.render('catalog', { title: 'Educational Demo for Node.js', lessonPlans: lessonPlans });
});

router.get('/', function (req, res, next) {
  res.render('catalog', { title: 'Educational Demo for Node.js', lessonPlans: lessonPlans });
});

module.exports = router;
