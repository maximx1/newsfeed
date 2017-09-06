var FeedInputManager = require("../pipeline/feedInputManager.js");

var Storage = require("../data/storage.js");
var storage = new Storage();

var FeedConfig = require("../data/feedConfig.js");
var feedConfig = new FeedConfig();

var FeedFilterConfig = require("../data/feedFilterConfig.js");
var feedFilterConfig = new FeedFilterConfig();

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
      var data = { source: req.body.source, url: req.body.url };
      feedConfig.add(data, function(result) {
        if(result.result.upserted) {
          res.json({status: "ok", message: "Added - source: " + data.source + ", url: " + data.url});
        } else {
          res.json({status: "ok", message: "Source already exists"});
        }
      });
    });

    app.get('/api/feeds', function(req, res) {
      feedConfig.findAll(function(feeds) {
        res.json({status: "ok", message: feeds});
      });
    });

    app.get('/api/feeds/counts', function(req, res) {
      storage.getCountBySource(function(counts) {
        res.json({status: "ok", message: counts});
      });
    });

    app.get('/api/feeds/query/bydate', function(req, res) {
      var limit = Math.min(Number(req.query.limit) || 15, 200);
      var skip = Number(req.query.skip) || 0;
      storage.findAllByDate(limit, skip, function(results) {
        res.json({status: "ok", message: results});
      });
    });

    app.post('/api/filters/add', function(req, res) {
      feedFilterConfig.add({filterKey: req.body.filterKey}, function(results) {
        res.json({status: "ok", message: results});
      });
    });

    app.get('/api/filters', function(req, res) {
      feedFilterConfig.findAll(function(results) {
        res.json({status: "ok", message: results});
      });
    });

  }
};
