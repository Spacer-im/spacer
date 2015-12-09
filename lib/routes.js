Router.configure({
    layoutTemplate: 'layout'
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



var requireLogin = function () {
    if (!Meteor.user()) {
        this.redirect("/");
    }
    else {
        this.next();
    }
};

Router.onBeforeAction(requireLogin, {only: 'newsSubmit'});