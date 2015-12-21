Tags = new Mongo.Collection("tags");

Schemas.Tags = {
    name: {
        type: String,
        label: "Name",
        min: 3,
        max: 500
    },
    type: {
        type: String,
        label: "Type",
        allowedValues: [
            "skill",
            "segment",
            "company",
            "specific",
            "other"
        ],
        autoform: {
            afFieldInput: {
                type: "select"
            }
        }
    }
};

Tags.helpers.asOptions = function () {
    return _.map(Tags.find({}).fetch(), function (tag) {
        return {
            label: tag.name,
            value: tag._id
        };
    });
};

Tags.attachSchema(Schemas.Tags);

