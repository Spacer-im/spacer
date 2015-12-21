News = new Mongo.Collection('news');


Schemas.News = {
    title: {
        type: String,
        label: "Title",
        min: 6,
        max: 500
    },
    text: {
        type: String,
        label: "Text",
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

News.attachSchema(Schemas.News);