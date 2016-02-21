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
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date()};
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
        }
    },
    updatedAt: {
        type: Date,
        autoValue: function() {
            if (this.isUpdate) {
                return new Date();
            }
        },
        denyInsert: true,
        optional: true
    }
});
