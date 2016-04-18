Template.jobListSide.onCreated(function () {
    Session.set("job-location", "");
    Session.set("job-type", []);
    Session.set("job-word", "");
    this.countrySubscription = this.subscribe("countries");
});

Template.jobList.helpers({
        filter: function () {
            const jobTypes = Session.get("job-type");
            const dict = {
                location: Session.get("job-location"),
                jobType: jobTypes && jobTypes.length ? {$all: Session.get("job-type")} : null
            };
            if (Session.get("job-word")) {
                const regExpr = {$regex: Session.get("job-word"), $options: '-i'};
                dict["$or"] = [
                    {title: regExpr},
                    {keywords: regExpr}
                ]
            }
            return dict;
        }
    }
);
Template.jobListSide.helpers({
    countryOptions: function () {
        if (Template.instance().countrySubscription.ready()) {
            return Locations.find({}, {sort: {country: 1}}).map((el) => {
                return {"label": el.country, "value": el.country}
            })
        }
        else {
            return [{label: "World", value: "World"}];
        }
    },
    allJobTypes: () => Schemas.JOB_TYPES,
    emptyList: []
});

Template.jobListSide.events({
    "change #jobsFilter select[name='location']": function (event) {
        const list = event.target;
        if (list.options[list.selectedIndex]) {
            const value = list.options[list.selectedIndex].value;
            if (!Session.equals("job-location", value)) {
                Session.set("job-location", value);
            }
        }
    },
    "change #jobsFilter select[name='jobType']": function (event) {
        const $list = $(event.target);
        const value = $list.val() || [];
        //if (!Session.equals("job-type", value)) {
        Session.set("job-type", value);
        //}
    },
    "input #iJobWord": _.debounce(function (e) {
        const value = e.target.value;
        if (!Session.equals("job-word", value)) {
            Session.set("job-word", value);
        }
    }, 300)

});