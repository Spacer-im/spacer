Template.userProfile.onCreated(function () {
   this.editedPart = ReactiveVar("");
});

Template.userProfile.helpers({
    isOwner: function() {
        return Meteor.userId() === this._id;
    }
});

Template.userProfile.events({
    "click #btnEdit": function (event) {
        event.preventDefault();
        Router.go(`/profile-edit`);
    }
});