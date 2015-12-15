News = new Mongo.Collection('news');


Schemas.News = {
    title: {
        type: String,
        label: "Title",
        min: 6,
        max: 500
    },
    imageURL: {
        type: String,
        label: "Featured Image URL",
        optional: true
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
    submited: {
        type: Date,
        autoform: {
            afFieldInput: {
                type: "bootstrap-datetimepicker"
            }
        }
    }
};

News.attachSchema(Schemas.News);