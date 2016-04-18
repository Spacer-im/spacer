Template.home.onCreated(function () {
    Session.set("article-word", "");
    this.jobsHomeReady = ReactiveVar(false);
    this.upcomingEventsReady = ReactiveVar(false);
    this.featuredProjectsReady = ReactiveVar(false);
    this.subscribe("jobs", 3, (() => {this.jobsHomeReady.set(true)}).bind(this));
    this.subscribe("spEvents", 3, (() => {this.upcomingEventsReady.set(true)}).bind(this));
    this.subscribe("featuredProjects", 3, (() => {this.featuredProjectsReady.set(true)}).bind(this));
});

Template.home.helpers({
    jobs: () => Jobs.find({}, {sort: {submitted: -1}}),
    upcomingEvents: () => SpEvents.find({}, {sort: {createdAt: -1}}),
    featuredProjects: () => Projects.find({}, {limit: 3, sort: {importance: -1}}),
    jobsAreReady: () => Template.instance().jobsHomeReady.get(),
    upcomingEventsReady: () => Template.instance().upcomingEventsReady.get(),
    featuredProjectsReady: () => Template.instance().featuredProjectsReady.get(),
    filter: function () {
        const dict = {};
        if (Session.get("article-word")) {
            const regExpr = {$regex: Session.get("article-word"), $options: '-i'};
            dict["$or"] = [
                {title: regExpr},
                {short: regExpr}
            ]
        }
        return dict;
    }
});

Template.home.events({
    "input #inputArticleWord": _.debounce(function (e) {
        const value = e.target.value;
        if (!Session.equals("article-word", value)) {
            Session.set("article-word", value);
        }
    }, 300)

});