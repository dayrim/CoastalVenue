const express = require('express');
const path = require('path');
const app = express();
const w3c = require('w3c-validate').createValidator();
const request = require('request');

app.use(express.static(__dirname + '/public/'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
request('http://localhost:8084/', function(error, response, body) {
  w3c.validate(body, function(err) {
    console.error(err);
    if (err) {
      console.error(err);
    } else {
      console.log('Html is Valid !');
    }
  });
});

app.listen(process.env.PORT || 8084);
