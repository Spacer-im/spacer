Schemas.SP_EVENT_ROLES = ['Software developer', 'Hardware maker', 'Designer', 'Entrepreneur'];
Schemas.SP_EVENT_INTERESTS = ['Eco space', 'Mini-satellites', 'Space edutech', 'Space research', 'Space robotics'];

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
        label: "Event Id",
        autoform: {
            type: "hidden"
        }
    },
    userId: {
        type: String,
        label: "User Id",
        optional: true // Required to add in the methods
    },
    role: {
        type: String,
        label: "Role",
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
    interest: {
        type: String,
        label: "Interest",
        allowedValues: Schemas.SP_EVENT_INTERESTS,
        autoform: {
            type: "select2",
            placeholder: "Choose your interest",
            options: () => Schemas.SP_EVENT_INTERESTS.map(el => {return {label: el, value: el}}),
            select2Options: function () {
                return {theme: "bootstrap"}
            }
        }
    },
    knowEnglish: {
        type: String,
        label: "Know English",
        allowedValues: ["Yes", "No"],
        autoform: {
            type: "select2",
            placeholder: "Know English",
            options: () => ["Yes", "No"].map(el => {return {label: el, value: el}}),
            select2Options: function () {
                return {theme: "bootstrap"}
            }
        }
    },
    phone: {
        type: String,
        label: "Contact phone number",
        autoform: {
            placeholder: "+111 111 11 11"
        }
    },

    placeWorkStudy: {
        type: String,
        label: "Place of work/study",
        autoform: {
            placeholder: "International Space Station"
        }
    },


    additional: {
        type: String,
        label: "Additional",
        optional: true,
        max: 250,
        autoform: {
            rows: 3,
            placeholder: "I'm going to build a spaceship..."
        }
    },
    createdAt: {
        type: Date,
        autoValue: Schemas.autoDateInsert,
        optional: true,
        autoform: {
            type: "hidden"
        }
    }
});

