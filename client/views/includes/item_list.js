function subscribeItems(subscriptionName, increment) {
    increment = increment || 5;
    let limit = Session.get("itemLimit");
    limit += increment;
    Session.set("itemLimit", limit);
    Session.set("listReady", false);
    Meteor.subscribe(subscriptionName, limit, function(){
        Session.set("listReady", true);
    });
}

Template.itemList.onCreated(function () {
    Session.set("itemLimit", 0);
    subscribeItems(this.data.subscription);
});

Template.itemList.helpers({
    items: function() {
        return Mongo.Collection.get(this.collection).find({}, {limit: Session.get("itemLimit")})},
    listIsReady: () => Session.get("listReady"),
    moreItems: function () {
        return Session.get("itemLimit") <= Mongo.Collection.get(this.collection).find().count();
    }
});


Template.itemList.events({
    "click #b-more": function(event) {
        event.preventDefault();
        subscribeItems(this.subscription);
    }
});