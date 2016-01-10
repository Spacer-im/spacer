Meteor.methods({
    saveProfile: function (doc) {
        check(doc, Schemas.UserProfile);
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Meteor.users.update(Meteor.userId(), {$set: {profile: doc}});
    }
});