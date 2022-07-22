var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
require('dotenv').config()
const { createMessageTemplate } = require("../messageHelper");
const { listTemplates } = require("../messageHelper");

router.use(bodyParser.json());

router.post('/', function(req, res, next) {

  const templateName = process.env.TEMPLATE_NAME;

  // const n = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  // const t = new Date().toLocaleTimeString()

  // const templateName = 'a_'
  //   + n[t[0]] + '_' + n[t[1]] + '_'
  //   + n[t[3]] + '_' + n[t[4]] + '_'
  //   + n[t[6]] + '_' + n[t[7]]

  createMessageTemplate(templateName)
    .then(function (response) {
      console.log(response)

      listTemplates(templateName)
      .then(function (response) {
        let template = response.data.data.filter(t => t.name == templateName)
        console.log(template)
        return;
      })      
      return;
    })
    .catch(function (error) {
      console.log(error);
      console.log(error.response.data);
      return;
    });
});

module.exports = router;
