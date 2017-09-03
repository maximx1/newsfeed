var mongoCommon = require("./mongoCommon.js");

function Storage(url) {
  this.url = url;
  this.primaryCollectionName = "feeds";
  this.dumpFeedEntry = mongoCommon.add;
  this.getCount = mongoCommon.count;
};

module.exports = Storage;
