Schemas.Education = new SimpleSchema({
    id: {
        type: String,
        optional: true,
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

Schemas.PersonalProject = new SimpleSchema({
    id: {
        type: String,
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
    name: {
        label: "name",
        type: String,
        min: 2,
        max: 500,
        autoform: {
            placeholder: "Space Ship"
        }
    },
    description: {
        type: String,
        label: "Description",
        optional: true,
        max: 420,
        autoform: {
            placeholder: "It was built for the Mars"
        }
    },
    imageId: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: "fileUpload",
                collection: "personalProjectImages",
                onAfterInsert: function () {
                    return function (err, fileObj) {
                        if (err) {
                            console.error(err);
                        }
                        else {
                            Meteor.call("clearProjectImages", fileObj._id);
                        }
                    }
                }

            }
        }
    }
});

Schemas.Experience = new SimpleSchema({
    id: {
        type: String,
        optional: true,
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
            rows: 3
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
        label: "Short about me",
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
    projects: {
        type: [Schemas.PersonalProject],
        label: "Projects",
        optional: true,
        blackbox: true,
        maxCount: 5
    },
    education: {
        type: [Schemas.Education],
        label: "Education",
        optional: true,
        blackbox: true,
        maxCount: 5
    },
    experience: {
        type: [Schemas.Experience],
        label: "Experience",
        optional: true,
        blackbox: true,
        maxCount: 5
    }
});