Template.userProfileEdit.helpers({
    profileSchema: Schemas.UserProfile
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
    onSuccess: function(formType, result) {
        Router.go("/profile/");
    }
});