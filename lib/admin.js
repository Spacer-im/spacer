AdminConfig = {
    adminEmails: Meteor.settings.admins,
    collections: {
        News: {
            tableColumns: [
                { label: 'Title', name: 'title' },
                { label: 'Submitted', name: 'submitted' }
            ]
        },
        Jobs: {
            tableColumns: [
                { label: 'Title', name: 'title' },
                { label: 'Short', name: 'short' },
                { label: 'Submitted', name: 'submitted' }
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