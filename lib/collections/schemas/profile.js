Schemas.Education = new SimpleSchema({
    id: {
        type: String,
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
        label: "Grade Year",
        optional: true,
        min: 1900,
        autoform: {
            placeholder: "2042"
        }
    },
    fieldOfStudy: {
        type: String,
        label: "Field of Study",
        optional: true,
        autoform: {
            placeholder: "Exploration of the outer space"
        }
    }
});

Schemas.Links = new SimpleSchema({

    website: {
        type: String,
        label: "Website",
        regEx: SimpleSchema.RegEx.Url,
        optional: true,
        autoform: {
            placeholder: "http://spacer.im"
        }
    },
    linkedin: {
        type: String,
        label: "LinkedIn",
        regEx: SimpleSchema.RegEx.Url,
        optional: true,
        autoform: {
            placeholder: "http://www.linkedin.com/in/???"
        }
    },
    github: {
        type: String,
        label: "Github",
        regEx: SimpleSchema.RegEx.Url,
        optional: true,
        autoform: {
            placeholder: "https://github.com/???"
        }
    },
    facebook: {
        type: String,
        label: "Facebook",
        regEx: SimpleSchema.RegEx.Url,
        optional: true,
        autoform: {
            placeholder: "https://www.facebook.com/???"
        }
    },
    twitter: {
        type: String,
        label: "Twitter",
        regEx: SimpleSchema.RegEx.Url,
        optional: true,
        autoform: {
            placeholder: "http://www.twitter.com/???"
        }
    },
    gplus: {
        type: String,
        label: "Google Plus",
        regEx: SimpleSchema.RegEx.Url,
        optional: true,
        autoform: {
            placeholder: "https://plus.google.com/u/0/???"
        }
    }
});

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
        label: "Calling",
        max: 140,
        optional: true,
        autoform: {
            placeholder: "The First Man in Space"
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
                            console.log(err);
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
        blackbox: true

    }
});