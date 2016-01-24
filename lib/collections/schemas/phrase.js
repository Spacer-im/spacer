Schemas.Phrase = new SimpleSchema({
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