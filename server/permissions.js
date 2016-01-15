var allowAdmin = function(userId, doc) {
    return userId && Roles.userIsInRole(userId, ['admin']);
};

News.allow({
    insert: allowAdmin,
    update: allowAdmin,
    remove: allowAdmin
});


Companies.allow({
    insert: allowAdmin,
    update: allowAdmin,
    remove: allowAdmin
});


Thumbs.allow({
    insert: allowAdmin,
    update: allowAdmin,
    remove: allowAdmin,
    download: () => true
});

Avatars.allow({
    insert: function(userId, doc) {
        return allowAdmin(userId) || (userId && doc.owner === userId && Avatars.find({owner: userId}).count() <= 5);
    },
    update: function(userId, doc) {
        return allowAdmin() || (userId && doc.owner === userId);
    },
    remove: function(userId, doc) {
        return allowAdmin(userId) || (userId && doc.owner === userId);
    },
    download: () => true
});

ProjectImages.allow({
    insert: function(userId, doc) {
        return allowAdmin(userId) || (userId && doc.owner === userId && Avatars.find({owner: userId}).count() <= 10);
    },
    update: function(userId, doc) {
        return allowAdmin() || (userId && doc.owner === userId);
    },
    remove: function(userId, doc) {
        return allowAdmin(userId) || (userId && doc.owner === userId);
    },
    download: () => true
});

Meteor.users.deny({
    update: function() {
        return true;
    }
});