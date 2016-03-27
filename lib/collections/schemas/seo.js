Schemas.SEO = new SimpleSchema({
    route_name: {
        type: String,
        label: "Route"
    },
    title: {
        type: String,
        label: "Page title",
        max: 500
    },
    "meta.description": {
        type: String,
        label: "Description",
        autoform: {
            rows: 3
        }
    },
    'og.title': {
        type: String,
        label: "OpenGraph title",
        max: 500
    },
    'og.image': {
        type: String,
        label: "OpenGraph image URL",
        optional: true
    }
});