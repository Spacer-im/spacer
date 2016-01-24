Schemas.Education = new SimpleSchema({
    id: {
        type: String,
        autoValue: Schemas.ifNewId,
        autoform: {
            type: "hidden"
        }
    },
    schoolName: {
        label: "School",
        type: String,
        min: 2,
        max: 500,
        autoform: {
            placeholder: "Spacer Academy"
        }
    },
    gradeYear: {
        type: Number,
        label: "Grad Year",
        optional: true,
        min: 1900,
        autoform: {
            placeholder: "2042"
        }
    },
    fieldOfStudy: {
        type: String,
        label: "Degree, Field Of Study",
        optional: true,
        autoform: {
            placeholder: "Exploration of the outer space"
        }
    }
});