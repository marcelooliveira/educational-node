var axios = require('axios');
var path = require('path')
var FormData = require('form-data');
var fs = require('fs');

function sendMessage(data) {
  var config = {
    method: 'post',
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config)
}

function getLessonPlanTemplatedMessageInput(recipient, templateName, lp) {

  const lessonPlan = {
    course: lp.course,
    thumbnail: lp.thumbnail,
    contents: lp.contents
      .map(i => '*Module ' + i.module + '* - ' + i.name)
      .join(', ')
  }

  return JSON.stringify({
    "messaging_product": "whatsapp",
    "to": recipient,
    "type": "template",
    "template": {
      "name": templateName,
      "language": {
        "code": "en_US"
      },
      "components": [
        {
          "type": "header",
          "parameters": [
            {
              "type": "image",
              "image": {
                "link": lessonPlan.thumbnail
              }
            }
          ]
        },
        {
          "type": "body",
          "parameters": [
            {
              "type": "text",
              "text": lessonPlan.course
            },
            {
              "type": "text",
              "text": lessonPlan.contents
            }
          ]
        }
      ]
    }
  }
  );
}

function listTemplates() {

  return axios({
    method: 'get',
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.BUSINESS_ACCOUNT_ID}/message_templates`
      + `?limit=1000`
      + `&access_token=${process.env.ACCESS_TOKEN}`
  })
}

function uploadImage() {
  return axios({
      method: 'post',
      url: `https://graph.facebook.com/${process.env.VERSION}/app/uploads`
      + `?access_token=${process.env.ACCESS_TOKEN}&file_type=image/png`
    }).then(function (response) {
      const uploadSessionId = response.data.id
      
      const filePath = path.join(__dirname, "/public/images/Python.png");

      var data = new FormData();
      data.append('messaging_product', 'whatsapp');
      data.append('file', fs.createReadStream(filePath));
      
      var config = {
        method: 'post',
        url: `https://graph.facebook.com/${process.env.VERSION}/${uploadSessionId}`,
        headers: { 
          'Authorization': `OAuth ${process.env.ACCESS_TOKEN}`,
          'file_offset': 0,
          'Host': 'graph.facebook.com',
          'Connection': 'close',
          'Content-Type': 'multipart/form-data', 
        },
        data : filePath
      };
      
      return axios(config)
    })
}

function getMediaUrl(mediaId) {
  var config = {
    method: 'get',
    url: `https://graph.facebook.com/${process.env.VERSION}/${mediaId}`,
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };
  
  return axios(config);
}

function uploadImageAndCreateMessageTemplate(templateName) {
  return uploadImage()
  .then(function (response) {
    const fileHandle = response.data.h;

    createMessageTemplate(templateName, fileHandle)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });    
  })
  .catch(function (error) {
    console.log(error);
  });  
}

function createMessageTemplate(templateName, fileHandle) {

  var config = {
    method: 'post',
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.BUSINESS_ACCOUNT_ID}/message_templates`,
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    data: {
      name: templateName,
      category: "TRANSACTIONAL",
      components: [{
        type: "BODY",
        text: "Your Lesson Plan"
          + "\n*Course*: {{1}}"
          + "\n*Contents*: {{2}}"
          + "\nPlease reply to this message if you have any questions.",
        example: {
          body_text: [
            [
              "example-text-1",
              "example-text-2",
            ]
          ]
        }
      },
      {
        type: "HEADER",
        format: "IMAGE",
        text: null,
        buttons: null,
        example: {header_handle:[fileHandle]}
      }],
      "language": "en_US"
    }
  };

  return axios(config)
}

module.exports = {
  sendMessage: sendMessage,
  listTemplates: listTemplates,
  uploadImage: uploadImage,
  uploadImageAndCreateMessageTemplate: uploadImageAndCreateMessageTemplate,
  createMessageTemplate: createMessageTemplate,
  getLessonPlanTemplatedMessageInput: getLessonPlanTemplatedMessageInput
};