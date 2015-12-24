// Global helpers
Meteor.startup(function () {
    Meteor.subscribe("phrases");
});



function isPage(templateList) {
    return () => {
        let currentRoute = Router.current();
        return currentRoute && currentRoute.route && templateList.indexOf(currentRoute.route.getName()) != -1;
    }
}

Template.registerHelper("phrase", (name) => {
    let el = Phrases.findOne({name: name});
    return el ? el.text : "";
});
Template.registerHelper("pageTitle", () => Session.get("pageTitle") || "Spacer");
Template.registerHelper("isNews", isPage(['newsList', "newsArticle"]));
Template.registerHelper("isJobs", isPage(['jobsList', "jobDescription"]));

// Tags unwrap

Template.tagsList.helpers({
    fullTags: function () {
        if (this && this.tags) {
            return Tags.find({_id: {$in: this.tags}});
        }
        else {
            return [];
        }
    }
});

Template.login.rendered = function()
{
    Accounts._loginButtonsSession.set('dropdownVisible', true);
};

Accounts.onLogin(function() {
    Router.go("home");
});