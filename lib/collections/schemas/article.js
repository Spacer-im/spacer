Schemas.Article = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        min: 6,
        max: 500
    },
    slug: {
        type: String,
        label: "Slug",
        unique: true,
        autoform: {
            //readonly: true
        }
    },
    short: {
        type: String,
        label: "Short",
        optional: true,
        autoform: {
            rows: 3
        }
    },
    imageId: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: "cfs-file",
                collection: "images"
            }
        }
    },
    text: {
        type: String,
        label: "Text",
        autoform: {
            rows: 30,
            type: "markdown"
        }
    },
    tags: {
        type: [String],
        optional: true,
        label: "Tags",
        autoform: {
            // connect later
        }
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