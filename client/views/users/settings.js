Template.userSettings.onRendered(function () {
    const checkboxPublic = document.getElementById('settings-isPrivate');
    if (checkboxPublic) {
        checkboxPublic.checked = Meteor.user().profile && !Meteor.user().profile.isPrivate;
    }

});

Template.userSettings.helpers({
    isPrivate: function () {
        return Meteor.user().profile && !Meteor.user().profile.isPrivate;
    }
});

Template.userSettings.events({
    'change #settings-isPrivate': function (event) {
        if (event.target) {
            const status = event.target.checked;
            Meteor.call("setPrivacy", !status);
        }

    }
});