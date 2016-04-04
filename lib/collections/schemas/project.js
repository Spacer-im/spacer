Schemas.Project = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        min: 1,
        max: 140
    },
    slug: {
        type: String,
        label: "Slug (don't change it if it isn't required)",
        unique: true
    },
    imageId: {
        type: String,
        optional: true,
        label: "Image",
        autoform: {
            afFieldInput: {
                type: "fileUpload",
                collection: "images"
            }
        }
    },
    short: {
        type: String,
        label: "Short",
        optional: true,
        max: 420,
        autoform: {
            rows: 2
        }
    },
    description: {
        type: String,
        label: "Description",
        autoform: {
            rows: 30,
            type: "markdown"
        }
    },
    keywords: {
        type: [String],
        optional: true,
        label: "Tags",
        max: 32,
        maxCount: 5
    },
    participateLink: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        label: "Participate Link"
    },
    importance: {
        type: Number,
        label: "Importance of the project for Featured",
        autoValue: function () {
            return this.value || 0;
        },
        optional: true
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            if (!this.value && this.isInsert) {
                return new Date();
            }
        },
        autoform: {
            type: "datetime",
            defaultValue: () => new Date()
        }
    }
});
