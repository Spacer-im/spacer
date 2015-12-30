function subscribeNews() {
    let limit = Session.get("newsLimit");
    limit += 5;
    Session.set("newsLimit", limit);
    Meteor.subscribe("news", limit, function(){
        Session.set("newsHomeReady", true);
    });
}

Template.home.onCreated(function () {
    Session.set("newsLimit", 0);
    subscribeNews();
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
    moreNews: () => Session.get("newsLimit") <= News.find().count(),
    jobsAreReady: () => Session.get("jobsHomeReady"),
    fCompaniesAreReady: () => Session.get("fCompaniesHomeReady")
});


Template.home.events({
   "click #b-more-news": function(event) {
       event.preventDefault();
       Session.set("newsHomeReady", false);
       subscribeNews();
   }
});