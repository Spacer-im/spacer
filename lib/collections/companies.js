Companies = new Mongo.Collection('companies');

Schemas.Company._schema.tags.autoform = {options: Tags.helpers.asOptions};

Migrations.doMigration(Migrations.Names.ADD_COMPANIES_SLUG, () => {Companies.attachSchema(Schemas.Company)});

Companies.helpers({
    imageURL: function (auth=true) {
        let tId = Thumbs.findOne(this.thumbId);
        return this.thumbId && tId ? tId.url({auth: auth}) : '/icons/logo_rocket.png';
    },
    gdRating: function () {
        return this.glassDoorData && this.glassDoorData.overallRating;
    },
    industryName: function () {
        return (this.glassDoorData && this.glassDoorData.industryName) || this.industry;
    }
});

Companies.helpers.companyNamesAsOptions = function() {
    let d = _.map(Companies.find({}).fetch(), function (doc) {
        return {
            label: doc.name,
            value: doc.name
        };
    });
    console.log(d);
    return d;
};