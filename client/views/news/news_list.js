Meteor.subscribe('news');

Template.newsList.helpers({
    news: () => News.find({}, {sort: {submitted: -1}})
});