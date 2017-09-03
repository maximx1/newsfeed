var Storage = require("./src/data/storage.js");
var storage = new Storage("mongodb://localhost:27017/newsfeed");
storage.dumpFeedEntry({"outlet": "Vox", "description": "Trump did something else"}, function() {
  storage.getCount(function(count) {
    console.log(count);
  });
});
