Schemas.EventInfo = new SimpleSchema({
    name: {
        type: String,
        label: "Event Name"
    },
    slug: {
        type: String,
        label: "Slug"
    },
    text: {
        type: String,
        label: "Text",
        autoform: {
            rows: 30,
            type: "markdown"
        }
    },
    additionalText: {
        type: String,
        label: "Additional Text",
        autoform: {
            rows: 10,
            type: "markdown"
        }
    },
    createdAt: {
        type: Date,
        autoValue: Schemas.autoDateInsert,
        autoform: {
            type: "hidden"
        }
    }
});

Schemas.EventRegistration = new SimpleSchema({
    eventId: {
        type: String,
        label: "Event Id"
    },
    userId: {
        type: String,
        label: "User Id"
    },
    role: {
        type: String,
        allowedValues: ['Software developer', 'Hardware maker', 'Designer', 'Entrepreneur'],
        autoform: {
            type: "select2",
            placeholder: "Choose your role",
            select2Options: function () {
                return {theme: "bootstrap"}
            }
        }
    },
    createdAt: {
        type: Date,
        autoValue: Schemas.autoDateInsert
    }
});

