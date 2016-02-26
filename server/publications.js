function clearFilter(inFilter) {
    inFilter = inFilter || {};
    const filter = {};
    Object.keys(inFilter).forEach((k) => {
        if (inFilter[k]) {
            filter[k] = inFilter[k]
        }
    });
    return filter;
}

function generateOptions(limit = 0, omitFields = [], sortField = "submitted", reverse = true) {
    const options = {};
    if (limit && limit > 0) {
        options.limit = limit;
    }
    if (omitFields && omitFields.length) {
        options.fields = {};
        for (let f of omitFields) {
            options.fields[f] = false;
        }
    }
    if (sortField) {
        options.sort = {};
        options.sort[sortField] = reverse ? -1 : 1;
    }
    return options;
}

Meteor.smartPublish('news', function (limit) {
    this.addDependency("news", "imageId", doc => Images.find(doc.imageId));
    return News.find({}, generateOptions(limit, ["text"]));
});

Meteor.smartPublish("news_by_slug", function (slug) {
    this.addDependency("news", "imageId", doc => Images.find(doc.imageId));
    return News.find({slug: slug});
});

Meteor.publish("tags", function () {
    return Tags.find({});
});

Meteor.smartPublish('jobs', function (limit, filter) {
    filter = clearFilter(filter);
    this.addDependency("jobs", "companyName", doc => Companies.find({name: doc.companyName}));
    this.addDependency("companies", "imageId", doc => Images.find(doc.imageId));
    return Jobs.find(filter, generateOptions(limit, ["description"]));
});

Meteor.smartPublish("job", function (slug) {
    this.addDependency("jobs", "companyName", doc => Companies.find({name: doc.companyName}));
    this.addDependency("companies", "imageId", doc => Images.find(doc.imageId));
    return Jobs.find({slug: slug});
});

Meteor.smartPublish("companies", function (limit, filter) {
    filter = clearFilter(filter);
    this.addDependency("companies", "imageId", doc =>  Images.find(doc.imageId));
    return Companies.find(filter, generateOptions(limit, ["text"]));
});

Meteor.publish("companyNames", function () {
    return Companies.find({}, {fields: {name: 1}});
});


Meteor.smartPublish("company", function (slug) {
    this.addDependency("companies", "imageId", doc => Images.find(doc.imageId));
    return Companies.find({slug: slug});
});


Meteor.publish("featured_companies", function () {
    return FeaturedCompanies.find({});
});

Meteor.smartPublish("projects", function (limit, filter) {
    filter = clearFilter(filter);
    this.addDependency("projects", "imageId", doc => Images.find(doc.imageId));
    return Projects.find(filter, generateOptions(limit, ["description"]));
});

Meteor.smartPublish("project", function (slug) {
    this.addDependency("projects", "imageId", doc => Images.find(doc.imageId));
    if (this.userId) {
        this.addDependency("projects", "_id",
                doc => Participations.find({authorId: this.userId, projectId: doc._id}))
    }
    return Projects.find({slug: slug});
});


Meteor.smartPublish("events", function (limit, filter) {
    filter = clearFilter(filter);
    return Events.find(filter, generateOptions(limit, ["text", "additionalText"]));
});

Meteor.smartPublish("event", function (slug) {
    const userId = this.userId || "";
    return [
        Events.find({slug: slug}),
        EventRegistrations.find({userId: userId})
    ]
});


Meteor.smartPublish("profile", function (username) {
    this.addDependency("users", "profile.photoId", doc => Avatars.find(doc.profile.photoId));
    //this.addDependency("users", "profile.projects", doc => {
    //    const ids = doc.profile.projects.map((p) => p.imageId);
    //    return UserImages.find({_id: {$in: ids}});
    //});
    this.addDependency("users", "_id", doc => Participations.find({authorId: doc._id}));
    this.addDependency("participations", "projectId",
            doc => Projects.find(doc.projectId, {fields: {name: 1, slug: 1, imageId: 1}}));
    this.addDependency("projects", "imageId", doc => Images.find(doc.imageId));
    return Meteor.users.find({username: username}, {fields: {"_id": 1, "username": 1, profile: 1}});
});

Meteor.publish('countries', function () {
    return Locations.find({});
});

Meteor.publish('professions', function () {
    return Professions.find({});
});

Meteor.smartPublish("projectComments", function (limit, filter) {
    filter = clearFilter(filter);
    this.addDependency("projectComments", "authorId",
            doc => Meteor.users.find(doc.authorId, {fields: {"username": 1, "profile.photoId": 1}}));
    this.addDependency("users", "profile.photoId", doc => Avatars.find(doc.profile.photoId));
    return ProjectComments.find(filter, generateOptions(limit, [], "createdAt", true));
});

Meteor.publish(null, () => Phrases.find({}));

Meteor.publish(null, () => Meteor.roles.find({}));
