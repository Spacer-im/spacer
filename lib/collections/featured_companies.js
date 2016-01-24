// TODO Rework it

FeaturedCompanies = new Mongo.Collection("featured_companies");

FeaturedCompanies.attachSchema({
    companyId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoform: {
            type: "select",
            options: function () {
                return _.map(Companies.find({}).fetch(), function (company) {
                    return {
                        label: company.name,
                        value: company._id
                    };
                });
            }
        }
    },
    order: {
        type: Number
    }
});

FeaturedCompanies.helpers({
    companyName: function () {
        let company = Companies.findOne({_id: this.companyId});
        return company ? company.name : "ID NOT FOUND";
    }
});
