function checkIsAdmin () {
    if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), ['admin'])) {
        throw new Meteor.Error("not-authorized");
    }
}

function getCSV(data) {
    return exportcsv.exportToCSV(data.map((el) => {
        const info = {
            username: el.username,
            // triple ; is a hack for google docs (replace then)
            link: `=HYPERLINK("https://spacer.im/profile/${el.username}";"${el.username}")`,
            email: el.emails && el.emails.length ? el.emails[0].address : ""
        };
        if (el.profile) {
            const profile = el.profile;
            info.firstName = profile.firstName || "";
            info.lastName = profile.lastName || "";
            info.calling = profile.calling || "";
            info.location = profile.location || "";
            info.professions = profile.professions && profile.professions.length ? "professions!" : "";
            info.education = profile.education && profile.education.length ? "education!" : "";
            info.experience = profile.experience && profile.experience.length ? "experience!" : "";
            info.created = el.createdAt;
        }
        return info;
    }));
}

// TODO: Too WET, make DRY
// Sorry, I was in hurry
Meteor.methods({
    allUserList: function() {
        checkIsAdmin();
        const data = Meteor.users.find({}, {fields: {username: 1, emails: 1, profile: 1, createdAt: 1}, sort: {createdAt: 1}});
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