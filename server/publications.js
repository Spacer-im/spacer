

Meteor.smartPublish('news', function (limit) {
    let options = {fields: {"text": false}, sort: {submitted: -1}};
    if (limit) {
        options.limit = limit;
    }
    this.addDependency("news", "imageId", function(doc) {
        return NewsImages.find(doc.imageId);
    });
    return News.find({}, options);
});

Meteor.smartPublish("news_by_slug", function(slug) {
    this.addDependency("news", "imageId", function(doc) {
        return NewsImages.find(doc.imageId);
    });
    return News.find({slug: slug});
});

Meteor.publish("news_by_id", function(id) {
    return News.find(id);
});

Meteor.publish("tags", function() {
    return Tags.find({});
});


Meteor.smartPublish('jobs', function(limit, inFilter) {
    const filter = {};
    Object.keys(inFilter).forEach((k) => {if (inFilter[k]) {filter[k] = inFilter[k]}});
    let options = {fields: {"description": false}, sort: {submitted: -1}};
    if (limit) {
        options.limit = limit;
    }
    this.addDependency("jobs", "companyName", function(doc) {
        return Companies.find({name: doc.companyName});
    });
    this.addDependency("companies", "thumbId", function(doc) {
        return Thumbs.find(doc.thumbId);
    });
    return Jobs.find(filter, options);
});

Meteor.smartPublish("job", function(slug) {
    this.addDependency("jobs", "companyName", function(doc) {
        return Companies.find({name: doc.companyName});
    });
    this.addDependency("companies", "thumbId", function(doc) {
        return Thumbs.find(doc.thumbId);
    });
    return Jobs.find({slug: slug});
});

Meteor.smartPublish("companies", function(limit) {
    this.addDependency("companies", "thumbId", function(doc) {
        return Thumbs.find(doc.thumbId);
    });
    return Companies.find({}, {fields: {"text": false}, limit: limit, sort: {name: 1}});
});

Meteor.publish("companyNames", function () {
    return Companies.find({}, {fields: {name: 1}});
});


Meteor.smartPublish("company", function(slug) {
    this.addDependency("companies", "thumbId", function(doc) {
        return Thumbs.find(doc.thumbId);
    });
    return Companies.find({slug: slug});
});



Meteor.publish("featured_companies", function() {
    return FeaturedCompanies.find({});
});



Meteor.smartPublish("profile", function(username) {
    this.addDependency("users", "profile.photoId", function(doc) {
        return Avatars.find(doc.profile.photoId);
    });
    
    this.addDependency("users", "profile.projects", function(doc) {
        const ids = doc.profile.projects.map((p) => p.imageId);
        return ProjectImages.find({_id: {$in: ids}});
    });
    
    return Meteor.users.find({username: username}, {fields: {"_id": 1, "username": 1, profile: 1}});
});

Meteor.publish('countries', function () {
   return Locations.find({});
});

Meteor.publish('professions', function () {
   return Professions.find({});
});




Meteor.publish(null, () => Phrases.find({}));

Meteor.publish(null, () => Meteor.roles.find({}));

//Meteor.publish(null, () => Avatars.find({}));

//Meteor.publish(null, () => ProjectImages.find({}));