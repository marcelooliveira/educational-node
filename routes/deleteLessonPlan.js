var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
require('dotenv').config()
const { deleteMessageTemplate } = require("../messageHelper");

router.use(bodyParser.json());

router.post('/', function (req, res, next) {

  const templateName = process.env.TEMPLATE_NAME;

  deleteMessageTemplate(templateName)
    .then(function (response) {
      console.log(response)
      return;
    })
    .catch(function (error) {
      console.log(error);
      console.log(error.response.data);
      return;
    });
});

module.exports = router;
