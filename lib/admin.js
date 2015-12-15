AdminConfig = {
    adminEmails: Meteor.settings.admins,
    collections: {
        News: {
            tableColumns: [
                { label: 'Title', name: 'title' },
                { label: 'Submited', name: 'submited' }
            ]
        },
        Tags: {
            tableColumns: [
                {label: 'Name', name: "name"},
                {label: 'Type', name: "type"}
            ]
        }
    }
};

if (Meteor.isClient) {
    Meteor.startup(function () {
        Meteor.subscribe("tags");
    });
}