var mongoCommon = require("./mongoCommon.js");

function FeedConfig(url) {
  this.url = url;
  this.primaryCollectionName = "feedConfig";
  this.add = mongoCommon.add;
  this.getCount = mongoCommon.count;
  this.findAll = mongoCommon.findAll;
};

module.exports = FeedConfig;
