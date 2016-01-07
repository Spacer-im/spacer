Companies = new Mongo.Collection('companies');


Companies.attachSchema({
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
    website: {
        type: String,
        label: "Website",
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    size: {
        type: String,
        label: "Company Size",
        optional: true

    },
    companyType: {
        type: String,
        label: "Company Type",
        optional: true
    },

    revenue: {
        type: String,
        label: "Revenue",
        optional: true
    },
    headquaters: {
        type: String,
        label: "Headquaters",
        optional: true
    },
    founded: {
        type: String,
        label: "Founded",
        optional: true
    },
    industry: {
        type: String,
        label: "Industry",
        optional: true
    },

    competitors: {
        type: String,
        label: "Competitors",
        optional: true
    },

    glassDoorId: {
        type: Number,
        optional: true,
        label: "GlassDoor ID"
    },
    glassDoorData: {
        type: Object,
        optional: true,
        blackbox: true,
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
});

Companies.helpers({
    imageURL: function () {
        let tId = Thumbs.findOne(this.thumbId);
        return this.thumbId && tId ? tId.url() : '/assets/company_no_logo.png';
    },
    gdRating: function() {
        return this.glassDoorData && this.glassDoorData.overallRating;
    },
    industryName: function() {
        return (this.glassDoorData && this.glassDoorData.industryName) || this.industry;
    }
});





