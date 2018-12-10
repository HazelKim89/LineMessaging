'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const router = express.Router();
// create LINE SDK config from env variables
const config = {
  channelAccessToken: "iPDd6Vf2VqRj858+y6t0SliWyd6LMZ+rYDmPMdqzMvUlfplGMvJyDoT9jwL6H4KoCBNXAjFCjR0KZxuqdQsts16+BuLYroe/Vc2veMwwul94XGxiGcOS3OuOK+baVK6XQiTUv/t1PmKP9nJH9ejJ5gdB04t89/1O/w1cDnyilFU=",
  channelSecret: "a9a1234ee11438c49b92482e31049178",
};

// create LINE SDK client
const client = new line.Client(config);

// register a webhook handler with middleware
// about the middleware, please refer to doc
router.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => {
      console.log('this is TEST!!!!')
      console.log(result)
      res.json(result)
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

module.exports = router