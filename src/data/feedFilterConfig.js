var mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/newsfeed";
var MongoClient = require('mongodb').MongoClient;

function FeedFilterConfig(url) {
  this.url = url;

  this.add = function(entry, callback) {
    MongoClient.connect(this.url || mongoURI, function(err, db) {
      var collection = db.collection("feedFilterConfig");
      collection.updateOne(entry, { $set : entry }, { upsert: true },
        function(err, result) {
          // TODO: Error logging
          db.close();
          callback(result);
        }
      );
    });
  };

  this.findAll = function(callback) {
    MongoClient.connect(this.url || mongoURI, function(err, db) {
      var collection = db.collection("feedFilterConfig");
      collection.find({}).toArray(function(err, result) {
        // TODO: Error logging
        db.close();
        callback(result);
      });
    });
  };
}

module.exports = FeedFilterConfig;
