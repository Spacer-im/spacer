Template.homeSidebar.onCreated(function () {
    Meteor.subscribe("jobs", 3, function () {
        Session.set("jobsHomeReady", true);
    });
    Meteor.subscribe("featured_companies", function () {
        Session.set("fCompaniesHomeReady", true);
    });

});

Template.homeSidebar.helpers({
    jobs: () => Jobs.find({}, {sort: {submitted: -1}}),
    fCompanies: () => FeaturedCompanies.find({}, {sort: {submitted: -1}}),
    jobsAreReady: () => Session.get("jobsHomeReady"),
    fCompaniesAreReady: () => Session.get("fCompaniesHomeReady")
});
