Schemas.PieceOfNews = new SimpleSchema({
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
                type: "fileUpload",
                collection: "images"
            }
        }
    },
    text: {
        type: String,
        label: "Text",
        autoform: {
            rows: 30
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
    submitted: {
        type: Date,
        autoform: {
            afFieldInput: {
                type: "bootstrap-datetimepicker"
            }
        }
    }
});