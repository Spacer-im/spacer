Schemas.SP_EVENT_ROLES = ['Software developer', 'Hardware maker', 'Designer', 'Entrepreneur'];

Schemas.SpEventInfo = new SimpleSchema({
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

Schemas.SpEventRegistration = new SimpleSchema({
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
        label: "You are...",
        allowedValues: Schemas.SP_EVENT_ROLES,
        autoform: {
            type: "select2",
            placeholder: "Choose your role",
            options: () => Schemas.SP_EVENT_ROLES.map(el => {return {label: el, value: el}}),
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

