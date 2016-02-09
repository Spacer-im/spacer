Template.jobs.onCreated(function () {
    this.filter = new ReactiveDict('filter');
    this.filter.set("location", "US");
});

Template.jobs.helpers({
    filter: () => Template.instance().filter
});

Template.jobs.events({
    "click #bTest": function (event) {
        event.preventDefault();
        Template.instance().filter.set("location", "Russian Federation");
    }
});