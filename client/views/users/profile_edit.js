Template.userProfileEdit.onCreated(function () {
    this.summaryCount = ReactiveVar(this.data.profile.summary ? this.data.profile.summary.length : 0);
});

Template.userProfileEdit.helpers({
    profileSchema: Schemas.UserProfile,
    educationSchema: Schemas.Education,
    summaryCount: function() {return Template.instance().summaryCount.get()},
    summaryOver: function() { return Template.instance().summaryCount.get() > 2500;}
});

Template.userProfileEdit.events({
    "click .b-education-remove": function(event) {
        event.preventDefault();
        let id = event.target.getAttribute("data-id");
        Meteor.call("removeEducation", id);
    },
    "keyup #fSummary": function(event) {
        let text = event.target.value;
        Template.instance().summaryCount.set(text.length);
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