Template.homeSidebar.onCreated(function () {
    this.jobsHomeReady = ReactiveVar(false);
    this.upcomingEventsReady = ReactiveVar(false);
    this.featuredProjectsReady = ReactiveVar(false);
    this.subscribe("jobs", 3, (() => {this.jobsHomeReady.set(true)}).bind(this));
    this.subscribe("events", 3, (() => {this.upcomingEventsReady.set(true)}).bind(this));
    this.subscribe("featuredProjects", 3, (() => {this.featuredProjectsReady.set(true)}).bind(this));
});

Template.homeSidebar.helpers({
    jobs: () => Jobs.find({}, {sort: {submitted: -1}}),
    upcomingEvents: () => Events.find({}, {sort: {createdAt: -1}}),
    featuredProjects: () => Projects.find({}, {limit: 3, sort: {importance: -1}}),
    jobsAreReady: () => Template.instance().jobsHomeReady.get(),
    upcomingEventsReady: () => Template.instance().upcomingEventsReady.get(),
    featuredProjectsReady: () => Template.instance().featuredProjectsReady.get()
});
