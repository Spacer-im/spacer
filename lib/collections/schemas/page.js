Schemas.Page = new SimpleSchema({
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
    text: {
        type: String,
        label: "Text",
        autoform: {
            rows: 30
        }
    }
});