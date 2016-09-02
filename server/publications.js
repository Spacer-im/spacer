function debugSleep(ms) {
    if (Meteor.settings.debug) {
        Meteor._sleepForMs(ms);
    }
}

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

Meteor.smartPublish('articles', function (limit, filter) {
    filter = clearFilter(filter);
    this.addDependency("articles", "imageId", doc => Images.find(doc.imageId));
    return Articles.find(filter, generateOptions(limit, ["text"], "createdAt"));
});

Meteor.smartPublish("article", function (slug) {
    this.addDependency("articles", "imageId", doc => Images.find(doc.imageId));
    return Articles.find({slug: slug});
});

Meteor.smartPublish("tempArticle", function () {
    const userId = this.userId || "";
    if (userId && Roles.userIsInRole(userId, ['admin'])) {
        return TempArticles.find({authorId: userId});
    }
    return [];
});

Meteor.publish("tags", function () {
    return Tags.find();
});

Meteor.smartPublish('jobs', function (limit, filter) {
    filter = clearFilter(filter);
    this.addDependency("jobs", "companyName", doc => Companies.find({name: doc.companyName}));
    this.addDependency("companies", "imageId", doc => Images.find(doc.imageId));
    return Jobs.find(filter, generateOptions(limit, ["description"], "createdAt"));
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


Meteor.publish("featuredCompanies", function () {
    return FeaturedCompanies.find({});
});

Meteor.smartPublish("projects", function (limit, filter) {
    filter = clearFilter(filter);
    this.addDependency("projects", "imageId", doc => Images.find(doc.imageId));
    this.addDependency("projects", "listImageId", doc => doc.listImageId ? Images.find(doc.listImageId) : []);
    return Projects.find(filter, generateOptions(limit, ["description"], "createdAt", true));
});

Meteor.smartPublish("project", function (slug) {
    this.addDependency("projects", "imageId", doc => Images.find(doc.imageId));
    if (this.userId) {
        this.addDependency("projects", "_id",
                doc => Participations.find({authorId: this.userId, projectId: doc._id}))
    }
    return Projects.find({slug: slug});
});

Meteor.publish("featuredProjects", function (limit) {
    return Projects.find({}, generateOptions(limit, ["description"], "importance", true));
});

Meteor.smartPublish("spEvents", function (limit, filter) {
    filter = clearFilter(filter);
    filter['$or'] = [{closed: {'$exists': false}}, {closed: false}];
    return SpEvents.find(filter, generateOptions(limit, ["text", "additionalText"]));
});

Meteor.smartPublish("spEvent", function (slug) {
    const userId = this.userId || "";
    return [
        SpEvents.find({slug: slug}),
        SpEventRegistrations.find({userId: userId})
    ]
});

Meteor.smartPublish("spEventRegistrations", function (slug) {
    const userId = this.userId || "";
    if (userId && Roles.userIsInRole(userId, ['admin'])) {
        this.addDependency("spEvents", "_id", doc => SpEventRegistrations.find({eventId: doc._id}));
        this.addDependency("spEventRegistrations", "userId",
                doc => Meteor.users.find({_id: doc.userId}));
        return SpEvents.find({slug: slug});
    }
    else {
        return [];
    }
});


Meteor.smartPublish("profile", function (username) {
    this.addDependency("users", "profile.photoId", doc => Avatars.find(doc.profile.photoId));
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

Meteor.publish('customPage', function (slug) {
    return CustomPages.find({slug});
});

Meteor.publish(null, () => Phrases.find({}));

Meteor.publish(null, () => Meteor.roles.find({}));

Meteor.publish(null, function() {
    if (this.userId) {
        const user = Meteor.users.findOne({_id: this.userId});
        if (user && user.profile) {
            return Avatars.find(user.profile.photoId);
        }
    }
    this.ready();
});
