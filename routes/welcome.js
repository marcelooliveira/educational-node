var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
require('dotenv').config()
const { sendMessage, getTextMessageInput } = require("../messageHelper");

router.use(bodyParser.json());

router.post('/', function (req, res, next) {
  var data = getTextMessageInput(process.env.RECIPIENT_WAID, 'Welcome to the Educational Demo App for Node.js!');

  sendMessage(data)
    .then(function (response) {
      res.redirect('/catalog');
      return;
    })
    .catch(function (error) {
      console.log(error);
      return;
    });
});

module.exports = router;
