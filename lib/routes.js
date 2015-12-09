Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

Router.route('/', {name: 'home'});

Router.route('/news', {
    name: 'newsList',
    waitOn: function() {
        return Meteor.subscribe("news_titles")
    },
    data: function () {
        return {news: News.find({}, {sort: {submitted: -1}})}
    }
});
