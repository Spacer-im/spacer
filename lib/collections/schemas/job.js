Schemas.Job = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        min: 6,
        max: 500
    },
    companyName: {
        type: String,
        label: "Company Name"
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
            // connect later
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
});