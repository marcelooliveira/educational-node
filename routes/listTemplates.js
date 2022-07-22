var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
require('dotenv').config()
const { listTemplates } = require("../messageHelper");

router.use(bodyParser.json());

router.post('/', function(req, res, next) {

  const templateName = process.env.TEMPLATE_NAME;

  listTemplates(templateName)
    .then(function (response) {
      let template = response.data.data.filter(t => t.name == templateName)
      console.log(template)
      return;
    })
    .catch(function (error) {
      console.log(error);
      console.log(error.response.data);
      return;
    });
});

module.exports = router;
