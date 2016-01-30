Jobs = new Mongo.Collection('jobs');

Schemas.Job._schema.location.autoform.options = Locations.helpers.countriesAsOptions;
//Schemas.Job._schema.companyName.autoform.options = Companies.helpers.companyNamesAsOptions;

Jobs.attachSchema(Schemas.Job);

Jobs.helpers({
    companyLogoURL: function () {
        let company = Companies.findOne({name: this.companyName});
        if (company && company.thumbId) {
            return Thumbs.findOne(company.thumbId).url();

        }
        return '/icons/logo_rocket.png';
    },
    companySlug: function () {
        let company = Companies.findOne({name: this.companyName});
        return company ? company.slug : "";
    }
});