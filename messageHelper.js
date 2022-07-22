var axios = require('axios');

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

function getTextMessageInput(recipient, text) {
  return JSON.stringify({
    "messaging_product": "whatsapp",
    "preview_url": false,
    "recipient_type": "individual",
    "to": recipient,
    "type": "text",
    "text": {
        "body": text
    }
  });
}

function getTemplatedMessageInput(recipient, templateName, consumption) {
  return JSON.stringify({
    "messaging_product": "whatsapp",
    "to": recipient,
    "type": "template",
    "template": {
      "name": "sample_movie_ticket_confirmation",
      "language": {
        "code": "en_US"
      },
    

    }
  }
  );
}

function listTemplates() {

  return axios({
    method: 'get',
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.BUSINESS_ACCOUNT_ID}/message_templates`
    + `?limit=1000`
    + `&access_token=${process.env.ACCESS_TOKEN}`})
}

function deleteMessageTemplate(templateName) {

    return axios({
      method: 'delete',
      url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.BUSINESS_ACCOUNT_ID}/message_templates`
      + `?name=${templateName}`
      + `&access_token=${process.env.ACCESS_TOKEN}`})
}

function createMessageTemplate(templateName) {

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
          text:"You Lesson Plan"
          +"\n*Course*: {{1}}"
          +"\n*Contents*: {{2}}"
          +"\nPlease reply to this message if you have any questions.",
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
          "type": "HEADER",
          "format": "IMAGE",
          "text": null,
          "buttons": null,
          "example": {
            "header_handle": [
              "3:cHl0aG9uLnBuZw==:aW1hZ2UvcG5n:ARaYnSw33HrOULyG-_li1u81YTVjlcg6l4cgPmBrH_YXtfQcgOmmB85JO4Pi-oDoMmyGN6jq1SWCveEEHW3j8BnQUJ7sc6pNLcwJnENtd17EPQ:e:1658795608:ARZ_AdYaUXac53j97jg"
            ]
          }
        }],        
        "language": "en_US"
      }
    };

    return axios(config)
  }

function getLessonPlanTemplatedMessageInput(recipient, templateName, lessonPlan) {
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

module.exports = {
  sendMessage: sendMessage,
  getTextMessageInput: getTextMessageInput,
  getTemplatedMessageInput: getTemplatedMessageInput,
  listTemplates: listTemplates,
  deleteMessageTemplate: deleteMessageTemplate,
  createMessageTemplate: createMessageTemplate,
  getLessonPlanTemplatedMessageInput: getLessonPlanTemplatedMessageInput
};