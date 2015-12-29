Meteor.startup(function () {
    Meteor.subscribe("phrases");
    Meteor.subscribe("tags");
    Meteor.subscribe("companies_cut");
    Meteor.subscribe("featured_companies");
});