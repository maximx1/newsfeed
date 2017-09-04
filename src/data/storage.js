var mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/newsfeed";
var MongoClient = require('mongodb').MongoClient;

function Storage(url) {
  this.url = url;

  this.add = function(entry, callback) {
    MongoClient.connect(this.url || mongoURI, function(err, db) {
      var collection = db.collection("feeds");
      collection.updateOne({"link": entry.link, "newsfeed-source": entry["newsfeed-source"], "pubdate": entry.pubdate}, { $set : entry }, { upsert: true },
        function(err, result) {
          // TODO: Error logging
          db.close();
          callback(result);
        }
      );
    });
  };

  this.count = function(callback) {
    MongoClient.connect(this.url || mongoURI, function(err, db) {
      var collection = db.collection("feeds");
      collection.find({}).count(function(err, result) {
        // TODO: Error logging
        db.close();
        callback(result);
      });
    });
  };

  this.findAll = function(callback) {
    MongoClient.connect(this.url || mongoURI, function(err, db) {
      var collection = db.collection("feeds");
      collection.find({}).toArray(function(err, result) {
        // TODO: Error logging
        db.close();
        callback(result);
      });
    });
  };

  this.getCountBySource = function(callback) {
    MongoClient.connect(this.url || mongoURI, function(err, db) {
      var collection = db.collection("feeds");
      collection.aggregate([{"$group": {_id:"$newsfeed-source", count:{$sum:1}}}]).toArray(
        function(err, result) {
          // TODO: Error logging
          db.close();
          callback(result);
        }
      );
    });
  };

  this.findAllByDate = function(limit, skip, callback) {
    MongoClient.connect(this.url || mongoURI, function(err, db) {
      var collection = db.collection("feeds");
      collection.find({}).sort({"pubdate":-1}).skip(skip).limit(limit).toArray(function(err, result) {
        // TODO: Error logging
        db.close();
        callback(result);
      });
    });
  };

};

module.exports = Storage;
