Phrases = new Mongo.Collection('phrases');


Schemas.Phrases = {
    name: {
        type: String,
        label: "Name"
    },
    text: {
        type: String,
        label: "Text",
        autoform: {
            rows: 5
        }


    }
};

Phrases.attachSchema(Schemas.Phrases);
