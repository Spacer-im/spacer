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
    insert: allowAdmin,
    update: allowAdmin,
    remove: allowAdmin,
    download: () => true
});

Meteor.users.deny({
    update: function() {
        return true;
    }
});