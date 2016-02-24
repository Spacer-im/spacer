Template.userProfileContent.helpers({
    isOwner: function() {
        return Meteor.userId() === this._id;
    },
    participations: function () {
        if (Meteor.userId()) {
            return Participations.find({authorId: Meteor.userId()}, {sort: {createdAt: -1}});
        }
        return [];
    }
});

Template.userProfileContent.events({
    "click #btnEdit": function (event) {
        event.preventDefault();
        Router.go(`/profile-edit`);
    }
});