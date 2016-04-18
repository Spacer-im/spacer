Template.profilePage.helpers({
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

Template.profilePage.events({
    "click #btnEdit": function (event) {
        event.preventDefault();
        Router.go(`/profile-edit`);
    }
});