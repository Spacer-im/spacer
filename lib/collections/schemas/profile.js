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
        max: 500
    },
    gradeYear: {
        type: Number,
        label: "Grade Year",
        optional: true,
        min: 1900
    },
    fieldOfStudy: {
        type: String,
        label: "Field of Study",
        optional: true
    }
});

Schemas.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        optional: true
    },
    lastName: {
        type: String,
        optional: true
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    summary: {
        type: String,
        optional: true,
        max: 2501,
        autoform: {
            rows: 5
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