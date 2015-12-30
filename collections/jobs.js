Jobs = new Mongo.Collection('jobs');

Jobs.attachSchema({
    title: {
        type: String,
        label: "Title",
        min: 6,
        max: 500
    },
    companyName: {
        type: String,
        label: "Company Name"
    },
    short: {
        type: String,
        label: "Short"
    },
    location: {
        type: String,
        label: "Location"
    },
    description: {
        type: String,
        label: "Description",
        autoform: {
            rows: 30,
            type: "markdown"
        }
    },
    tags: {
        type: [String],
        optional: true,
        label: "Tags",
        autoform: {
            options: Tags.helpers.asOptions
        }
    },
    submitted: {
        type: Date,
        autoform: {
            afFieldInput: {
                type: "bootstrap-datetimepicker"
            }
        }
    }
});

Jobs.helpers({
    logoURL: function () {
        let companyPath = Meteor.settings.public && Meteor.settings.public.companyPath;
        let defaultLogoPath = Meteor.settings.public && Meteor.settings.public.defaultLogoPath || "/logo/nologo.png";
        return companyPath && this.companyName ? companyPath + this.companyName.toLowerCase() + ".png" : defaultLogoPath;
    }
});