AdminConfig = {
    adminEmails: Meteor.settings.admins,
    collections: {
        News: {
            tableColumns: [
                { label: 'Title', name: 'title' },
                { label: 'Submited', name: 'submited' }
            ],
            showDelColumn: false // temp fix
        }
    }
};