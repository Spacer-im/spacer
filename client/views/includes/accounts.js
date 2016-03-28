Template.login.rendered = function () {
    Accounts._loginButtonsSession.set('dropdownVisible', true);
};

Template.login.helpers({
    isSignUp: () =>Accounts._loginButtonsSession.get("inSignupFlow")
});


Template.registerHelper("isAdmin", function () {
    let loggedUser = Meteor.user();
    return loggedUser && Roles.userIsInRole(loggedUser, ['admin']);
});

Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-profile': function (event) {
        Router.go('/profile');
    },
    'click #login-buttons-admin': function (event) {
        Router.go('/admin');
    },
    'click #login-buttons-add-news': function (event) {
        Router.go('/news-add');
    },
    'click #login-buttons-add-company': function (event) {
        Router.go('/company-add');
    },
    'click #login-buttons-add-job': function (event) {
        Router.go('/job-add');
    },
    'click #login-buttons-add-project': function (event) {
        Router.go('/project-add');
    }
});

Template._loginButtonsLoggedInDropdown.helpers({
    user_profile_picture: function () {
        var user = Meteor.user();
        if (user && user.avatarUrl()) {
            return user.avatarUrl();
        }
        return "";
    }
});

Template._loginButtonsFormField.onRendered(function () {
    const checkbox = document.getElementById('login-subscribeDigest');
    if (checkbox) {
        checkbox.checked = true;
    }
});

accountsUIBootstrap3.setCustomSignupOptions = function() {
    const checkbox = document.getElementById('login-subscribeDigest');
    console.log(checkbox.checked);
    return {
        subscribeDigest:
    }
};