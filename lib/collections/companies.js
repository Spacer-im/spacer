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
