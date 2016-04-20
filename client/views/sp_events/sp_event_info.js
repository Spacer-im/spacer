Template.spEventSidebar.onCreated(function () {
    this.roleSelected = ReactiveVar("");
});

Template.spEventSidebar.helpers({
    alreadyRegistered: function () {
        const data = Template.instance().data;
        return Meteor.userId() && data && SpEventRegistrations.findOne({userId: Meteor.userId(), eventId: data._id});
    },
    registerStatus: () => Template.instance().roleSelected.get() ? "" : "disabled",
    registeredRole: () => {
        const eventId = Template.instance().data ? Template.instance().data._id : "";
        if (eventId && Meteor.userId()) {
            const reg = SpEventRegistrations.findOne({userId: Meteor.userId(), eventId: eventId});
            return reg ? reg.role : "";
        }
        return "";
    },
    currentRoute: () => {
        const slug = Template.instance().data ? Template.instance().data.slug : "";
        return `events/${slug}`
    }
});
//
//Template.spEventInfoSidebar.events({
//    "change #roleSelect": function (event, template) {
//        const $select = $(event.target);
//        template.roleSelected.set($select ? $select.val() : "");
//    },
//    "click #bRegister": function (event, template) {
//        event.preventDefault();
//        const roleSelected = template.roleSelected.get();
//        template.roleSelected.set("");
//        Meteor.call("registerToEvent", template.data._id, roleSelected);
//    }
//});