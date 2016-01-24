Schemas.Experience = new SimpleSchema({
    id: {
        type: String,
        autoValue: Schemas.ifNewId,
        autoform: {
            type: "hidden"
        }
    },
    company: {
        type: String,
        label: "Company",
        autoform: {
            placeholder: "Foundation"
        }
    },
    title: {
        type: String,
        label: "Title",
        autoform: {
            placeholder: "Mathematician, Mayer, Trader etc"
        }
    },
    dates: {
        type: String,
        label: "Dates",
        optional: true,
        autoform: {
            placeholder: "Apr 1961 - Now"
        }
    },
    description: {
        type: String,
        label: "Description",
        optional: true,
        max: 280,
        autoform: {
            placeholder: "What did I do? My achievements.",
            rows: 5
        }
    }
});