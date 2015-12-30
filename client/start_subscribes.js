Meteor.startup(function () {
    Meteor.subscribe("phrases");
    Meteor.subscribe("tags");
    Meteor.subscribe("companies");
    Meteor.subscribe("featured_companies");
});