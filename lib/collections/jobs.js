Jobs = new Mongo.Collection('jobs');

Jobs.attachSchema(Schemas.Job);


if (Meteor.isServer) {
    Jobs._ensureIndex({
        "description": "text",
        'title': "text",
        "keywords": "text"
    });


}

Jobs.helpers({
    companyLogoURL: function () {
        let company = Companies.findOne({name: this.companyName});
        if (company && company.imageId) {
            return Images.findOne(company.imageId).url();

        }
        return '/icons/logo_rocket.png';
    },
    companySlug: function () {
        let company = Companies.findOne({name: this.companyName});
        return company ? company.slug : "";
    }
});