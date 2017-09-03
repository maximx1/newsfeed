var mongoCommon = require("./mongoCommon.js");

function FeedConfig(url) {
  this.url = url;
  this.primaryCollectionName = "feedConfig";
  this.add = mongoCommon.add;
  this.getCount = mongoCommon.count;
};

module.exports = FeedConfig;
