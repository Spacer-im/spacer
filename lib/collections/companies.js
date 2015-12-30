Companies = new Mongo.Collection('companies');


Schemas.Companies = {
    name: {
        type: String,
        label: "Name",
        min: 1,
        max: 500
    },
    thumbId: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: "cfs-file",
                collection: "thumbs"
            }
        }
    },
    short: {
        type: String,
        label: "Short",
        optional: true,
        autoform: {
            rows: 2
        }
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
    glassDoorId: {
        type: Number,
        optional: true,
        label: "GlassDoor ID"
    },
    glassDoorData: {
        type: Object,
        optional: true,
        label: "GlassDoor"
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

Companies.helpers({
    imageURL: function () {
        let tId = Thumbs.findOne(this.thumbId);
        return this.thumbId && tId ? tId.url() : '/assets/company_no_logo.png';
    }
});


Companies.allow({
    insert: allowAdmin,
    update: allowAdmin,
    remove: allowAdmin
});


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
        let company = Companies.findOne({_id: this.companyId});
        return company ? company.name : "ID NOT FOUND";
    }
});


FeaturedCompanies.attachSchema(Schemas.FeaturedCompanies);
