var mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/newsfeed";
var MongoClient = require('mongodb').MongoClient;

function Storage(url) {
  this.url = url;
};

Storage.prototype.dumpFeedEntry = function(entry, callback) {
  MongoClient.connect(this.url || mongoURI, function(err, db) {
    var collection = db.collection('feeds');
    collection.updateOne(entry, { $set : entry }, { upsert: true },
      function(err, result) {
        // Error logging
        db.close();
        callback(result);
      }
    );
  });
}

Storage.prototype.getCount = function(callback) {
  MongoClient.connect(this.url || mongoURI, function(err, db) {
    var collection = db.collection('feeds');
    collection.find({}).count(function(err, result) {
      // Error logging
      db.close();
      callback(result);
    });
  });
};

module.exports = Storage;
