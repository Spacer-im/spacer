Meteor.publish('news_titles', function () {
    return News.find({}, {fields: {"text": false}});
});

Meteor.publish("news_article", function(newsId) {
    return News.find({_id: newsId});
});

Meteor.publish("tags", function() {
    return Tags.find({});
});


