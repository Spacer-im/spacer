Template.spEventPageReport.helpers({
    getUsername: (userId) => {
        const user = Meteor.users.findOne(userId);
        return user ? user.username : "";
    }
});