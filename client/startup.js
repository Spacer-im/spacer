Meteor.startup(function () {
    Meteor.subscribe("tags");
    Meteor.subscribe("featured_companies");
});