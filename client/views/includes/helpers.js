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

// Tags unwrap

Template.tagsList.helpers({
    fullTags: function () {
        return Tags.find({_id: {$in: this.tags}});
    }
});