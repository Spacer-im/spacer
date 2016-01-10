Phrases = new Mongo.Collection('phrases');


Phrases.attachSchema({
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
});
