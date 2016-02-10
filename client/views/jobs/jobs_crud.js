const selector = 'input #insertJobForm input[name="title"],' +
    ' input #insertJobForm input[name="companyName"],' +
    ' input #insertJobForm input[name="location"]';

Template.insertJobForm.onCreated(function () {
   this.subscribe("countries");
   this.subscribe("companyNames");
});


Template.insertJobForm.onRendered(function () {
    Meteor.typeahead.inject();
});

Template.insertJobForm.helpers({
    compList: function () {
        return Companies.find({}).map(el => el.name);
    }
});



Template.updateJobForm.onCreated(function () {
   this.subscribe("countries");
   this.subscribe("companyNames");
});

Template.updateJobForm.onRendered(function () {
    Meteor.typeahead.inject();
});

Template.updateJobForm.helpers({
    compList: function () {
        return Companies.find({}).map(el => el.name);
    }
});

Template.insertJobForm.events({
    'input #insertJobForm input[name="title"], input #insertJobForm input[name="companyName"], input #insertJobForm select[name="location"]': function (e) {
        e.preventDefault();
        let $slug = document.querySelector("#insertJobForm input[name='slug']");
        let $title = document.querySelector("#insertJobForm input[name='title']");
        let $company = document.querySelector("#insertJobForm input[name='companyName']");
        let $location = document.querySelector("#insertJobForm select[name='location']");
        let date = new Date();
        $slug.value = URLify2(`${date.getDate()}-${date.getMonth()}-${date.getUTCFullYear()}-${$title.value}-${$company.value}-${$location.value}`);
    }
});

AutoForm.addHooks(["insertJobForm", "updateJobForm"], {
    onSuccess: function (doc) {
        Router.go("jobs");
    }

});