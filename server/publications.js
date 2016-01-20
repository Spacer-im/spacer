

Meteor.publish('news', function (limit) {
    Meteor._sleepForMs(2000);
    let options = {fields: {"text": false}, sort: {submitted: -1}};
    if (limit) {
        options.limit = limit;
    }
    return News.find({}, options);
});

Meteor.publish("news_by_slug", function(slug) {
    return News.find({slug: slug});
});


Meteor.publish("news_by_id", function(id) {
    return News.find(id);
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

Meteor.publish("companies", function(limit) {
    return Companies.find({}, {fields: {"text": false}, limit: limit, sort: {name: 1}});
});


Meteor.publish("company", function(slug) {
    return Companies.find({slug: slug});
});



Meteor.publish("featured_companies", function() {
    return FeaturedCompanies.find({});
});



Meteor.publish("userProfile", function(username) {
    return Meteor.users.find({username: username}, {fields: {"_id": 1, "username": 1, profile: 1}});
});

Meteor.publish('countries', function () {
   return Locations.find({});
});



Meteor.publish(null, () => Phrases.find({}));

Meteor.publish(null, () => Meteor.roles.find({}));

Meteor.publish(null, () => Thumbs.find({}));

Meteor.publish(null, () => Avatars.find({}));

Meteor.publish(null, () => ProjectImages.find({}));