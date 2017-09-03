var mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/newsfeed";
var MongoClient = require('mongodb').MongoClient;

module.exports = {
  add: function(entry, callback) {
    primaryCollectionName = this.primaryCollectionName;
    MongoClient.connect(this.url || mongoURI, function(err, db) {
      var collection = db.collection(primaryCollectionName);
      collection.updateOne(entry, { $set : entry }, { upsert: true },
        function(err, result) {
          // TODO: Error logging
          db.close();
          callback(result);
        }
      );
    });
  },

  count: function(callback) {
    primaryCollectionName = this.primaryCollectionName;
    MongoClient.connect(this.url || mongoURI, function(err, db) {
      var collection = db.collection(primaryCollectionName);
      collection.find({}).count(function(err, result) {
        // TODO: Error logging
        db.close();
        callback(result);
      });
    });
  },

  findAll: function(callback) {
    primaryCollectionName = this.primaryCollectionName;
    MongoClient.connect(this.url || mongoURI, function(err, db) {
      var collection = db.collection(primaryCollectionName);
      collection.find({}).toArray(function(err, result) {
        // TODO: Error logging
        db.close();
        callback(result);
      });
    });
  }

}
