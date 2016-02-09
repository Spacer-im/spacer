Template.userProfileContent.helpers({
    isOwner: function() {
        return Meteor.userId() === this._id;
    }
});

Template.userProfileContent.events({
    "click #btnEdit": function (event) {
        event.preventDefault();
        Router.go(`/profile-edit`);
    }
});