// Global helpers
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

Template.registerHelper("isNews", isPage(['newsList', "newsArticle"]));
Template.registerHelper("isJobs", isPage(['jobList', "jobDescription"]));
Template.registerHelper("isCompanies", isPage(['companyList', "companyDescription"]));
Template.registerHelper("isProjects", isPage(['projectList', "projectDescription"]));

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
