var Storage = require("../data/storage.js");
var storage = new Storage();
var FeedRetrieval = require("../data/feedRetrieval.js");

module.exports = {
  pullFeeds: function(feeds, callback) {
    feeds.forEach(function(x) {
      FeedRetrieval.pullFeed(x.source, x.url, function(item) {
        storage.dumpFeedEntry(item, function(result) {
          console.log(JSON.stringify(result));
        })
      });
    });
    callback("successfully initiated feed loading")
  }
}
