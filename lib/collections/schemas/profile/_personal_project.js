Schemas.PersonalProject = new SimpleSchema({
    id: {
        type: String,
        autoValue: Schemas.ifNewId,
        autoform: {
            type: "hidden"
        }
    },
    projectName: {
        label: "Project Name",
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
            placeholder: "It was built for the Mars",
            rows: 3
        }
    },
    imageId: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: "fileUpload",
                collection: "userImages",
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