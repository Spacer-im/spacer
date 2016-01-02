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
    }
});





