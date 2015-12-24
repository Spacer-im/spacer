Meteor.publish('news', function (limit) {
    let options = {fields: {"text": false}, sort: {submitted: -1}};
    if (limit) {
        options.limit = limit;
    }
    return News.find({}, options);
});

Meteor.publish("news_article", function(newsId) {
    return News.find({_id: newsId});
});

Meteor.publish("tags", function() {
    return Tags.find({});
});


Meteor.publish('jobs', function(limit) {
    let options = {fields: {"description": false}, sort: {submitted: -1}};
    if (limit) {
        options.limit = limit;
    }
    return Jobs.find({}, options);
});

Meteor.publish("job", function(jobId) {
    return Jobs.find({_id: jobId});
});

Meteor.publish("companies_cut", function() {
    return Companies.find({}, {fields: {"description": false}});
});

Meteor.publish("featured_companies", function() {
    return FeaturedCompanies.find({});
});

Meteor.publish('phrases', () => Phrases.find({}));

Meteor.publish(null, () => Meteor.roles.find({}));