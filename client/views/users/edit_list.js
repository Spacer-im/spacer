Template.editList.onCreated(function () {
    let itemEditName = `edit${this.data.listName}`;
    this.itemEditName = itemEditName;
    AutoForm.addHooks([this.data.editFormId], {
        onSuccess: function (formType, result) {
            console.log(itemEditName);
            Session.set(itemEditName, null);
        }
    });
});

Template.editList.helpers({
    isItemEdit: (id) => Session.get(Template.instance().itemEditName) === id
});

Template.editList.events({
    "click .b-edit": function (event) {
        event.preventDefault();
        let id = event.target.getAttribute("data-id");
        Session.set(Template.instance().itemEditName, id);
    },
    "click .b-remove": function (event) {
        event.preventDefault();
        let id = event.target.getAttribute("data-id");

        Meteor.call(Template.instance().data.removeMethod, id);
    },
    "click .b-cancel": function (event) {
        event.preventDefault();
        Session.set(Template.instance().itemEditName, null);
    }
});