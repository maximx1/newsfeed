var Storage = require("../../src/data/storage.js");
var MongoUnit = require("mongo-unit");

var sampleFeed1 = {
  "outlet": "Vox",
  "description": "Trump did something"
};

var sampleFeed2 = {
  "outlet": "Vox",
  "description": "Trump did something else"
};

var sampleFeed3 = {
  "outlet": "Xov",
  "description": "Trump did something else"
};

var sampleFeed4 = {
  "outlet": "OXV",
  "description": "sample feed 3"
};

var load = {
  "feeds": [ sampleFeed1 ]
}

describe("storage", function() {
  describe("#add()", function() {
    var storage;

    before(function() {
      return MongoUnit.start().then(function(url) {
        storage = new Storage(url);
      }).then(function() {
        MongoUnit.load(load);
      });
    });

    after(function() {
      return MongoUnit.drop();
    });

    it("should be able to store a new feed entry", function() {
      storage.add(sampleFeed2, function(result) {
        expect(result.result.upserted).to.not.be.empty;
      });
    });

    it("should be able to store multiple entries", function() {
      storage.add(sampleFeed3, function(firstResult) {
        expect(firstResult.result.upserted).to.not.be.empty;
        storage.add(sampleFeed4, function(secondResult) {
          expect(secondResult.result.upserted).to.not.be.empty;
        });
      });
    });

    it("should fail to upsert a feed if it already exists", function() {
      storage.add(sampleFeed1, function(firstResult) {
        expect(firstResult.result.upserted).to.be.undefined;
      });
    });

  });
});
