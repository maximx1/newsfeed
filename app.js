var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var api = require('app-api.js');

app.get('/', function(req, res) {
  res.send('Hello World!');
});

api.init(app);

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
