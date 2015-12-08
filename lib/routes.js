Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', {name: 'home'});

Router.route('/news', {name: 'newsList'});

Router.route('/news/submit',
    {
        name: 'newsSubmit',
        data: {type: "Add"}
    });

Router.route('/news/submit/:id',
    {
        name: 'newsEdit',
        template: 'newsSubmit',
        data: function() {
            return {
                title: "Test",
                type: "Edit"
            }
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