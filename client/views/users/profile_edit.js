Template.userProfileEdit.helpers({
    profileSchema: Schemas.UserProfile,
    educationSchema: Schemas.Education
});

Template.userProfileEdit.events({
    "click .b-education-remove": function(event) {
        event.preventDefault();
        let id = event.target.getAttribute("data-id");
        Meteor.call("removeEducation", id);
    }
});



Template.afFileUpload.helpers({
        selectFileBtnData: function () {
            return {
                label: 'Choose file',
                url: this.atts.prevUrl
            }
        }
    }
);

AutoForm.addHooks(["profileForm"], {
    onSuccess: function (formType, result) {
        Meteor.call("clearTempAvatars");
        Router.go("/profile/");
    }
});