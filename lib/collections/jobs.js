Jobs = new Mongo.Collection('jobs');

Schemas.Job._schema.tags.autoform = {options: Tags.helpers.asOptions};

Jobs.attachSchema(Schemas.Job);

Jobs.helpers({
    logoURL: function () {
        let companyPath = Meteor.settings.public && Meteor.settings.public.companyPath;
        let defaultLogoPath = Meteor.settings.public && Meteor.settings.public.defaultLogoPath || "/logo/nologo.png";
        return companyPath && this.companyName ? companyPath + this.companyName.toLowerCase() + ".png" : defaultLogoPath;
    }
});