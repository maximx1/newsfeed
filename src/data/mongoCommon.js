var mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/newsfeed";
var MongoClient = require('mongodb').MongoClient;

function MongoCommon(url, primaryCollectionName) {
  this.primaryCollectionName = primaryCollectionName;
  this.url = url;
};

MongoCommon.prototype.add = function(entry, callback) {
  MongoClient.connect(this.url || mongoURI, function(err, db) {
    var collection = db.collection(this.primaryCollectionName);
    collection.updateOne(entry, { $set : entry }, { upsert: true },
      function(err, result) {
        // TODO: Error logging
        db.close();
        callback(result);
      }
    );
  });
};

MongoCommon.prototype.count = function(callback) {
  MongoClient.connect(this.url || mongoURI, function(err, db) {
    var collection = db.collection(this.primaryCollectionName);
    collection.find({}).count(function(err, result) {
      // TODO: Error logging
      db.close();
      callback(result);
    });
  });
};

MongoCommon.prototype.findAll = function(callback) {
  MongoClient.connect(this.url || mongoURI, function(err, db) {
  console.log(this.primaryCollectionName + "asdfasdfasf");
    var collection = db.collection(this.primaryCollectionName);
    collection.find({}).toArray(function(err, result) {
      // TODO: Error logging
      db.close();
      callback(result);
    });
  });
};

module.exports = MongoCommon
