Template.home.onCreated(function () {
    Meteor.subscribe("news", 5, function () {
        Session.set("newsHomeReady", true);
    });
    Meteor.subscribe("jobs", 3, function () {
        Session.set("jobsHomeReady", true);
    });
    Meteor.subscribe("featured_companies", function () {
        Session.set("fCompaniesHomeReady", true);
    });

});

Template.home.helpers({
    news: () => News.find({}, {sort: {submitted: -1}}),
    jobs: () => Jobs.find({}, {sort: {submitted: -1}}),
    fCompanies: () => FeaturedCompanies.find({}, {sort: {submitted: -1}}),
    newsAreReady: () => Session.get("newsHomeReady"),
    jobsAreReady: () => Session.get("jobsHomeReady"),
    fCompaniesAreReady: () => Session.get("fCompaniesHomeReady")
});
