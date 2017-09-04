var FeedConfig = require("../data/feedConfig.js");
var feedConfig = new FeedConfig();

module.exports = {
  init: function(app) {

    app.get('/', function(req, res) {
      res.render('index', { title: 'Hey', message: 'Hello there!' });
    });

    app.get('/config', function(req, res) {
      res.render('config');
    });

  }
};
