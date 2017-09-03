var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var api = require('./src/controllers/app-api.js');

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

api.init(app);

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
