Schemas.Participation = new SimpleSchema({
    authorId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        label: "Author Id"
    },
    projectId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        label: "Project Id"
    },
    text: {
        type: String,
        label: "Text",
        max: 140
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
