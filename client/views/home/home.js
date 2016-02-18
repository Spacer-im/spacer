Template.homeSidebar.onCreated(function () {
    this.jobsHomeReady = ReactiveVar(false);
    this.subscribe("jobs", 3, (() => {this.jobsHomeReady.set(true)}).bind(this));
});

Template.homeSidebar.helpers({
    jobs: () => Jobs.find({}, {sort: {submitted: -1}}),
    jobsAreReady: () => Template.instance().jobsHomeReady.get()
});
