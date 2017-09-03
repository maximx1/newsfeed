// var Storage = require("./src/data/storage.js");
// var storage = new Storage();
// storage.dumpFeedEntry({"outlet": "Vox", "description": "Trump did something else"}, function() {
//   storage.getCount(function(count) {
//     console.log(count);
//   });
// });

var FeedInputManager = require("./src/pipeline/feedInputManager.js");
var feeds = [
  { source: "vox", url: "https://www.vox.com/rss/index.xml" },
  { source: "arstechnica", url: "http://feeds.arstechnica.com/arstechnica/index/" },
  { source: "engadget", url: "http://engadget.com/rss.xml" },
  { source: "anandtech", url: "http://www.anandtech.com/rss/" },
  { source: "reddit technews", url: "https://www.reddit.com/r/technews/.rss"}
]

FeedInputManager.pullFeeds(feeds);
