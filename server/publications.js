Meteor.publish('news_titles', function () {
    return News.find({}, {fields: {"text": false}});
});