Template.spEventPageReport.helpers({
    getUsername: (userId) => {
        const user = Meteor.users.findOne(userId);
        return user ? user.username : "";
    },
    getUserFullname: (userId) => {
        const user = Meteor.users.findOne(userId);
        return user ? user.fullName() : "";
    },

    getEmail: (userId) => {
        const user = Meteor.users.findOne(userId);
        const emails = user ? user.emails : [];
        return emails && emails.length && emails[0].address || "";
    }
});