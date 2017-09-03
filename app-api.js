var FeedInputManager = require("./src/pipeline/feedInputManager.js");

module.export = {
  init: function(app) {
    app.get('/api/feeds/update', function(req, res) {
      res.json('Hello World!');
    });
  }
};
