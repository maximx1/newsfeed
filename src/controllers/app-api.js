var FeedInputManager = require("../pipeline/feedInputManager.js");
var FeedConfig = require("../data/feedConfig.js");
var feedConfig = new FeedConfig();

module.exports = {
  init: function(app) {

    app.get('/api/feeds/pull', function(req, res) {
      feedConfig.findAll(function(feeds) {
        FeedInputManager.pullFeeds(feeds, function(result) {
          res.json({message: result});
        });
      });
    });

    app.put('/api/feeds/add', function(req, res) {
      console.log(req.body);
      var data = { source: req.body.source, url: req.body.url };
      feedConfig.add(data, function(result) {
        if(result.result.upserted) {
          res.json({status: "ok", message: "Added - source: " + data.source + ", url: " + data.url});
        } else {
          res.json({status: "ok", message: "Source already exists"});
        }
      });
    });

  }
};
