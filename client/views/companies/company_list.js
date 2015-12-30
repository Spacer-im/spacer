function subscribeCompanies() {
    let limit = Session.get("companyLimit");
    limit += 5;
    Session.set("companyLimit", limit);
    Meteor.subscribe("companies", limit, function(){
        Session.set("companiesReady", true);
    });
}

Template.companyList.onCreated(function () {
    Session.set("companyLimit", 0);
    subscribeCompanies();
});

Template.companyList.helpers({
    companies: () => Companies.find({}, {sort: {name: 1}}),
    listIsReady: () => Session.get("companiesReady"),
    moreCompanies: () => Session.get("companyLimit") <= Companies.find().count()
});


Template.home.events({
    "click #b-more-companies": function(event) {
        event.preventDefault();
        Session.set("companiesReady", false);
        subscribeCompanies();
    }
});