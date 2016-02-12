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
            type: "select",
            placeholder: "Choose a country",
            firstOption: "(Empty) Earth",
            options: function () {
                return Locations.helpers.countriesAsOptions();
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
        type: String,
        label: "Job Type",
        allowedValues: ["Full time", "Part time", "Remote", "Internship"],
        autoform: {
            options: function () {
                return ["Full time", "Part time", "Remote", "Internship"].map(el => {
                    return {
                        label: el,
                        value: el
                    }
                })
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
    submitted: {
        type: Date,
        autoform: {
            afFieldInput: {
                type: "bootstrap-datetimepicker"
            }
        }
    }
});