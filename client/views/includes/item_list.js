Template.itemList.onCreated(function () {
    this.itemLimit = ReactiveVar(5);
    this.listReady = ReactiveVar(false);
    Meteor.subscribe(this.data.subscription, this.itemLimit.get(), () => {
        this.listReady.set(true);
    });
});

Template.itemList.helpers({
    items: function () {
        return Mongo.Collection.get(this.collection).find({}, {limit: Template.instance().itemLimit.get()})
    },
    listIsReady: () => Template.instance().listReady.get(),
    moreItems: function () {
        return Template.instance().itemLimit.get() <= Mongo.Collection.get(this.collection).find().count();
    }
});


Template.itemList.events({
    "click #b-more": function (event) {
        event.preventDefault();
        let instance = Template.instance();
        let limit = instance.itemLimit.get() + 5;
        instance.itemLimit.set(limit);
        instance.listReady.set(false);
        Meteor.subscribe(instance.data.subscription, limit, () => {
            instance.listReady.set(true);
        });
    }
});