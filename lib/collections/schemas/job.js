Schemas.JOB_TYPES = ["Full time", "Part time", "Remote", "Internship"];

Schemas.Job = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        min: 6,
        max: 500
    },
    companyName: {
        type: String,
        label: "Company Name",
        autoform: {
            afFieldInput: {
                "class": "form-control typeahead",
                autocomplete: "off",
                spellcheck: "off",
                "data-source": "compList"
            }
        }
    },
    location: {
        type: String,
        label: "Location",
        max: 500,
        optional: true,
        autoform: {
            type: "select2",
            placeholder: "Choose a country",
            firstOption: "(Empty) Earth",
            options: function () {
                return Locations.helpers.countriesAsOptions();
            },
            select2Options: function () {
                return {theme: "bootstrap"}
            }
        }
    },
    slug: {
        type: String,
        label: "Slug (don't change it if it isn't required)",
        unique: true
    },
    description: {
        type: String,
        label: "Description",
        autoform: {
            rows: 30,
            type: "markdown"
        }
    },
    jobType: {
        type: [String],
        label: "Job Type",
        allowedValues: Schemas.JOB_TYPES,
        autoform: {
            type: "select2",
            afFieldInput: {
                multiple: true
            },
            defaultValue: ["Full time"],
            firstOption: false,
            options: () => Schemas.JOB_TYPES.map(el => {
                return {label: el, value: el}
            }),
            select2Options: function () {
                return {theme: "bootstrap"}
            }
        }
    },
    keywords: {
        type: [String],
        optional: true,
        max: 32,
        label: "Keywords",
        maxCount: 5
    },
    applyLink: {
        type: String,
        label: "Apply Link"
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            if (!this.value && this.isInsert) {
                return new Date();
            }
        },
        autoform: {
            type: "datetime",
            defaultValue: () => new Date()
        }
    }
});