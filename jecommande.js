var FeedInputManager = require("./src/pipeline/feedInputManager.js");

var feeds = [
  { source: "vox", url: "https://www.vox.com/rss/index.xml" },
  { source: "arstechnica", url: "http://feeds.arstechnica.com/arstechnica/index/" },
  { source: "engadget", url: "http://engadget.com/rss.xml" },
  { source: "anandtech", url: "http://www.anandtech.com/rss/" },
  { source: "reddit technews", url: "https://www.reddit.com/r/technews/.rss"}
];

FeedInputManager.pullFeeds(feeds);
