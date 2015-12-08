Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', {name: 'home'});

Router.route('/news', {name: 'newsList'});



var requireLogin = function () {
    if (!Meteor.user()) {
        this.redirect("/");
    }
    else {
        this.next();
    }
};

Router.onBeforeAction(requireLogin, {only: 'newsSubmit'});