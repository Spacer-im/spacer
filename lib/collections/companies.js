Companies = new Mongo.Collection('companies');

Migrations.doMigration(Migrations.Names.ADD_COMPANIES_SLUG, () => {Companies.attachSchema(Schemas.Company)});

Companies.helpers({
    imageURL: function (auth=true) {
        let tId = Images.findOne(this.imageId);
        return this.imageId && tId ? tId.url({auth: auth}) : '/icons/logo_rocket.png';
    },
    gdRating: function () {
        return this.glassDoorData && this.glassDoorData.overallRating;
    },
    industryName: function () {
        return (this.glassDoorData && this.glassDoorData.industryName) || this.industry;
    }
});

Companies.helpers.companyNamesAsOptions = function() {
    return _.map(Companies.find({}).fetch(), function (doc) {
        return {
            label: doc.name,
            value: doc.name
        };
    });
};