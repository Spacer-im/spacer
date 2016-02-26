Schemas.Comment = new SimpleSchema({
    authorId: {
        type: String,
        label: "Author Id"
    },
    docId: {
        type: String,
        label: "Document Id"
    },
    text: {
        type: String,
        label: "Text",
        max: 700
    },
    createdAt: {
        type: Date,
        autoValue: Schemas.autoDateInsert
    },
    updatedAt: {
        type: Date,
        autoValue: Schemas.autoDateUpdate,
        denyInsert: true,
        optional: true
    }
});
