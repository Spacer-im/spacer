Template.itemList.onCreated(function () {
    this.increment = this.data.increment || 5;
    this.itemLimit = ReactiveVar(this.increment);
    this.listReady = ReactiveVar(false);
    this.filter = this.data.filter;
    this.sortBy = this.data.sortBy;
    this.sortOrder = this.data.sortOrder;
    let self = this;
    this.autorun(function () {
        self.subscribe(self.data.subscription, self.itemLimit.get(), Template.currentData().filter, () => {
            self.listReady.set(true);
        })
    });
});

Template.itemList.helpers({
    items: function () {
        const instance = Template.instance();
        const options = {
            limit: instance.itemLimit.get()
        };
        if (instance.sortBy) {
            options.sort = {};
            options.sort[instance.sortBy] = instance.sortOrder || -1;
        }
        return Mongo.Collection.get(this.collection).find({}, options)
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
        let limit = instance.itemLimit.get() + instance.increment;
        instance.itemLimit.set(limit);
        instance.listReady.set(false);
    }
});