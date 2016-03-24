Template.login.rendered = function()
{
    Accounts._loginButtonsSession.set('dropdownVisible', true);
};

Template.registerHelper("isAdmin", function() {
    let loggedUser = Meteor.user();
    return loggedUser && Roles.userIsInRole(loggedUser, ['admin']);
});

Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-profile': function(event) {
        Router.go('/profile');
    },
    'click #login-buttons-admin': function(event) {
        Router.go('/admin');
    },
    'click #login-buttons-add-news': function(event) {
        Router.go('/news-add');
    },
    'click #login-buttons-add-company': function(event) {
        Router.go('/company-add');
    },
    'click #login-buttons-add-job': function(event) {
        Router.go('/job-add');
    },
    'click #login-buttons-add-project': function(event) {
        Router.go('/project-add');
    }
});

Template._loginButtonsLoggedInDropdown.helpers({
    user_profile_picture: function() {
        var user = Meteor.user();
        if (user && user.avatarUrl()) {
            return user.avatarUrl();
        }
        return "";
    }
});