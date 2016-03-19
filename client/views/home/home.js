Template.homeSidebar.onCreated(function () {
    this.jobsHomeReady = ReactiveVar(false);
    this.upcomingEventsReady = ReactiveVar(false);
    this.subscribe("jobs", 3, (() => {this.jobsHomeReady.set(true)}).bind(this));
    this.subscribe("events", 3, (() => {this.upcomingEventsReady.set(true)}).bind(this));
});

Template.homeSidebar.helpers({
    jobs: () => Jobs.find({}, {sort: {submitted: -1}}),
    upcomingEvents: () => Events.find({}, {sort: {createdAt: -1}}),
    jobsAreReady: () => Template.instance().jobsHomeReady.get(),
    upcomingEventsReady: () => Template.instance().upcomingEventsReady.get()
});
