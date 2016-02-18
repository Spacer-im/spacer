Template.userProfileEditContent.onCreated(function () {
    this.summaryCount = ReactiveVar(this.data.profile.summary ? this.data.profile.summary.length : 0);
    this.callingCount = ReactiveVar(this.data.profile.calling ? this.data.profile.calling.length : 0);
    this.profList = new ReactiveArray(this.data.profile.professions ? this.data.profile.professions : []);
    this.countrySubscription = this.subscribe("countries");
    this.professionSubscription = this.subscribe("professions");

});

Template.userProfileEditContent.onRendered(function () {
    Meteor.typeahead.inject();
});

Template.userProfileEditContent.helpers({
    countryOptions: function () {
        if (Template.instance().countrySubscription.ready()) {
            return Locations.find({}).map((el) => {
                return {"label": el.country, "value": el.country}
            })
        }
        else {
            return [{label: "World", value: "World"}];
        }
    },
    s2opts: () => {
        return {"placeholder": "Choose a country"}
    },
    summaryCount: function () {
        return Template.instance().summaryCount.get()
    },
    summaryOver: function () {
        return Template.instance().summaryCount.get() > 2500;
    },
    callingCount: function () {
        return Template.instance().callingCount.get()
    },
    callingOver: function () {
        return Template.instance().callingCount.get() > 140;
    },
    profList: function () {
        return Professions.find().fetch().map((el) => el.name);
    },

    workProfList: function () {
        return Template.instance().profList.array();
    },

    randId: () => Random.Id()
});

Template.userProfileEditContent.events({
    "keyup #fSummary": function (event) {
        let text = event.target.value;
        Template.instance().summaryCount.set(text.length);
    },
    "keyup #fCalling": function (event) {
        let text = event.target.value;
        Template.instance().callingCount.set(text.length);
    },
    "click #addRole": function (event) {
        event.preventDefault();
        let iProf = document.getElementById("iProf");
        let val = iProf.value;
        let profList = Template.instance().profList;
        if (!val || profList.length >= 5 || profList.indexOf(val) !== -1) {
            return false;
        }
        profList.push(val);
        document.getElementById("profOut").value = profList.array();
        iProf.value = "";
    },
    "click .remove-prof": function (event) {
        event.preventDefault();
        let profName = this.toString();
        let profList = Template.instance().profList;
        let index = profList.indexOf(profName);
        if (index !== -1) {
            profList.splice(index, 1);
        }
        document.getElementById("profOut").value = profList.array();
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
