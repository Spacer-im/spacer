AdminConfig = {
    adminEmails: Meteor.settings.admins,
    collections: {
        News: {
            tableColumns: [
                { label: 'Title', name: 'title' },
                { label: 'Submitted', name: 'submitted' }
            ]
        },
        Companies: {
            tableColumns: [
                { label: 'Name', name: 'name' },
                { label: 'Submitted', name: 'submitted' }
            ]
        },
        FeaturedCompanies: {
            extraFields: ["companyId"],
            tableColumns: [
                { label: 'Company', name: 'companyName()' },
                { label: 'Order', name: 'order' }
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
        Meteor.subscribe("companies_cut");
        Meteor.subscribe("featured_companies");
    });
}