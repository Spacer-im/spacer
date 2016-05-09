function checkIsAdmin () {
    if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), ['admin'])) {
        throw new Meteor.Error("not-authorized");
    }
}

function getCSV(data) {
    return exportcsv.exportToCSV(data.map((el) => {
        return {
            username: el.username,
            email: el.emails && el.emails.length ? el.emails[0].address : "",
            firstName: el.profile && el.profile.firstName || "",
            lastName: el.profile && el.profile.lastName || ""
        }
    }));
}

// TODO: Too WET, make DRY
// Sorry, I was in hurry
Meteor.methods({
    allUserList: function() {
        checkIsAdmin();
        const data = Meteor.users.find({}, {fields: {username: 1, emails: 1, profile: 1}});
        return getCSV(data);
    },
    subscribedList: function() {
        checkIsAdmin();
        const data = Meteor.users.find({"profile.subscribeDigest": true}, {fields: {username: 1, emails: 1, profile: 1}});
        return getCSV(data);
    },
    spEventList: function(spEventId) {
        checkIsAdmin();
        const userIds = SpEventRegistrations.find({eventId: spEventId}, {fields: {userId: 1}}).map((doc) => doc.userId);
        const data = Meteor.users.find({_id: {$in: userIds}}, {fields: {username: 1, emails: 1, profile: 1}});
        return getCSV(data);
    },
    notInSpEventList: function(spEventId) {
        checkIsAdmin();
        const userIds = SpEventRegistrations.find({eventId: spEventId}, {fields: {userId: 1}}).map((doc) => doc.userId);
        const data = Meteor.users.find({_id: {$nin: userIds}}, {fields: {username: 1, emails: 1, profile: 1}});
        return getCSV(data);
    }
});