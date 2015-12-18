// Global helpers

function isPage(templateList) {
    return () => {
        let currentRoute = Router.current();
        return currentRoute && currentRoute.route && templateList.indexOf(currentRoute.route.getName()) != -1;
    }
}

Template.registerHelper("pagePhrase", () => Session.get("pagePhrase") || "Your space career toolkit");
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