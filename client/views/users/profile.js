Template.userProfileContent.helpers({
    isOwner: function() {
        return Meteor.userId() === this._id;
    },
    participations: function () {
        if (Template.instance().data) {
            return Participations.find({authorId: Template.instance().data._id}, {sort: {createdAt: -1}});
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