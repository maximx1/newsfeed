var FeedParser = require('feedparser');
var request = require('request');

module.exports = {
  pullFeed: function(sourceName, url, callback) {
    var req = request(url)
    var parser = new FeedParser({normalize: true});

    req.on('error', function(error) {
      // TODO: log stuff
      console.log(error);
    });

    req.on('response', function(response) {
      if(response.statusCode !== 200) {
        this.emit('error', new Error('Invalid status code recieved'))
      } else {
        this.pipe(parser);
      }
    });

    parser.on('error', function(error) {
      // TODO: log stuff
      console.log(error);
    });

    parser.on('readable', function() {
      var item;
      while(item = this.read()) {
        item['newsfeed-source'] = sourceName;
        callback(item);
      }
    });

  }
}
