# Useful queries

```
db.feed.find({}).pretty();
db.feed.find({}).count();
db.feedConfig.find({})
db.feeds.aggregate([{"$group": {_id:"$newsfeed-source", count:{$sum:1}}}])

```
