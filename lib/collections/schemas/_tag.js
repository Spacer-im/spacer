/**
 * Created by bryukh on 24/01/16.
 */
Schemas.Tag = new SimpleSchema({
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
});