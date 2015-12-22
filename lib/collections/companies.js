Companies = new Mongo.Collection('companies');


Schemas.Companies = {
    name: {
        type: String,
        label: "Name",
        min: 1,
        max: 500
    },
    logoURL: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
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
};

Companies.attachSchema(Schemas.Companies);


FeaturedCompanies = new Mongo.Collection("featured_companies");

Schemas.FeaturedCompanies = {
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
};


FeaturedCompanies.helpers({
    companyName: function () {
        console.log(this);
        let company = Companies.findOne({_id: this.companyId});
        return company ? company.name : "ID NOT FOUND";
    }
});


FeaturedCompanies.attachSchema(Schemas.FeaturedCompanies);
