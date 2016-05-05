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
    }
});