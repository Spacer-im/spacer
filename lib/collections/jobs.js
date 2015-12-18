Jobs = new Mongo.Collection('jobs');


Schemas.Jobs = {
    title: {
        type: String,
        label: "Title",
        min: 6,
        max: 500
    },
    companyLogoURL: {
        type: String,
        label: "Company Logo Image URL",
        optional: true
    },
    short: {
        type: String,
        label: "Short"
    },
    location: {
        type: String,
        label: "Location"
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
            options: function () {
                return _.map(Tags.find({}).fetch(), function (tag) {
                    return {
                        label: tag.name,
                        value: tag._id
                    };
                });
            }
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

Jobs.attachSchema(Schemas.Jobs);