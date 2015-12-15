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
            "other"
        ],
        autoform: {
            afFieldInput: {
                type: "select"
            }
        }
    }
};

Tags.attachSchema(Schemas.Tags);

