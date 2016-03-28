

Schemas.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        optional: true,
        autoform: {
            placeholder: "Yuri"
        }
    },
    lastName: {
        type: String,
        optional: true,
        autoform: {
            placeholder: "Gagarin"
        }

    },
    calling: {
        type: String,
        label: "Short about me",
        max: 140,
        optional: true,
        autoform: {
            placeholder: "The First Man in Space"
        }
    },
    location: {
        type: String,
        label: "Location",
        max: 500,
        optional: true,
        autoform: {
            type: "select2",
            placeholder: "Choose a country",
            firstOption: "(Empty) Earth"
        }
    },
    links: {
        type: Schemas.Links,
        optional: true
    },
    summary: {
        type: String,
        optional: true,

        max: 2501,
        autoform: {
            rows: 5,
            placeholder: "I'm ..."
        }
    },
    professions: {
        type: [String],
        optional: true,
        max: 32,
        maxCount: 5,
        autoform: {
            hidden: true
        }
    },
    photoId: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: "fileUpload",
                collection: "avatars",
                onAfterInsert: function () {
                    return function (err, fileObj) {
                        if (err) {
                            console.error(err);
                        }
                        else {
                            Meteor.call("clearTempAvatars", fileObj._id);
                        }
                    }
                }

            }
        }
    },
    education: {
        type: [Schemas.Education],
        label: "Education",
        optional: true,
        maxCount: 5
    },
    experience: {
        type: [Schemas.Experience],
        label: "Experience",
        optional: true,
        maxCount: 5
    },
    subscribeDigest: {
        type: Boolean,
        label: "Digest subscribed",
        optional: true
    }
});