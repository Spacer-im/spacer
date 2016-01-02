Template.companyInfo.events({
    "click #b-update-company": function (event) {
        event.preventDefault();
        Meteor.call("updateFromGlassDoor", this._id);
        alert("Send a request to GlassDoor");
    }
});