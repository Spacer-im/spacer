Template.userProfileEdit.onCreated(function () {
    this.summaryCount = ReactiveVar(this.data.profile.summary ? this.data.profile.summary.length : 0);
    this.callingCount = ReactiveVar(this.data.profile.calling ? this.data.profile.calling.length : 0);
});

Template.userProfileEdit.helpers({
    summaryCount: function() {return Template.instance().summaryCount.get()},
    summaryOver: function() { return Template.instance().summaryCount.get() > 2500;},
    callingCount: function() {return Template.instance().callingCount.get()},
    callingOver: function() { return Template.instance().callingCount.get() > 140;},
    randId: () => Random.Id()
});

Template.userProfileEdit.events({
    "keyup #fSummary": function(event) {
        let text = event.target.value;
        Template.instance().summaryCount.set(text.length);
    },
    "keyup #fCalling": function(event) {
        let text = event.target.value;
        Template.instance().callingCount.set(text.length);
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


Template.registerHelper("profileSchema", () => Schemas.UserProfile);
Template.registerHelper("educationSchema", () => Schemas.Education);
Template.registerHelper("experienceSchema", () => Schemas.Experience);
Template.registerHelper("personalProjectSchema", () => Schemas.PersonalProject);
