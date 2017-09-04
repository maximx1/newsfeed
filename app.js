var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var api = require('./src/controllers/app-api.js');
var web = require('./src/controllers/web.js');

app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

web.init(app);
api.init(app);

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
