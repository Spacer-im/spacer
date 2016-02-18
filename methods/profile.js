function checkIsUser() {
    if (!Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
    }
}

Meteor.methods({
    saveProfile: function (doc) {
        check(doc, Schemas.UserProfile);
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        let links = doc.links || {};
        Meteor.users.update(Meteor.userId(), {
            $set: {
                "profile.photoId": doc.photoId || null,
                "profile.firstName": doc.firstName || null,
                "profile.lastName": doc.lastName || null,
                "profile.calling": doc.calling || null,
                "profile.location": doc.location || null,
                "profile.professions": doc.professions || null,
                "profile.summary": doc.summary || null,
                "profile.links.website": links.website || null,
                "profile.links.linkedin": links.linkedin || null,
                "profile.links.twitter": links.twitter || null,
                "profile.links.facebook": links.facebook || null,
                "profile.links.github": links.github || null,
                "profile.links.gplus": links.gplus || null
            }
        });
    },
    addEducation: function (doc) {
        checkIsUser();
        Meteor.users.update(Meteor.userId(), {$push: {"profile.education": doc}})
    },
    editEducation: function (obj) {
        let doc = obj.$set;
        if (!doc || !doc.id) {
            throw new Meteor.Error("Education edit data or id not found");
        }
        check(doc, Schemas.Education);
        checkIsUser();
        Meteor.users.update({"_id": Meteor.userId(), "profile.education.id": doc.id}, {
            $set: {
                "profile.education.$.id": doc.id,
                "profile.education.$.schoolName": doc.schoolName || null,
                "profile.education.$.gradeYear": doc.gradeYear || null,
                "profile.education.$.fieldOfStudy": doc.fieldOfStudy || null
            }
        })
    },

    removeEducation: function (id) {
        checkIsUser();
        Meteor.users.update(Meteor.userId(), {
            $pull: {
                "profile.education": {"id": id}
            }
        })
    },
    addExperience: function (doc) {
        checkIsUser();
        doc.id = Random.id();
        Meteor.users.update(Meteor.userId(), {
            $push: {
                "profile.experience": doc
            }
        })
    },
    editExperience: function (obj) {
        let doc = obj.$set;
        if (!doc || !doc.id) {
            throw new Meteor.Error("Experience edit data or id not found");
        }
        check(doc, Schemas.Experience);
        checkIsUser();
        Meteor.users.update({"_id": Meteor.userId(), "profile.experience.id": doc.id}, {
            $set: {
                "profile.experience.$.id": doc.id,
                "profile.experience.$.company": doc.company || null,
                "profile.experience.$.title": doc.title || null,
                "profile.experience.$.dates": doc.dates || null,
                "profile.experience.$.description": doc.description || null
            }
        })
    },

    removeExperience: function (id) {
        checkIsUser();
        Meteor.users.update(Meteor.userId(), {
            $pull: {
                "profile.experience": {"id": id}
            }
        })
    },
    addPersonalProject: function (doc) {
        checkIsUser();
        Meteor.users.update(Meteor.userId(), {
            $push: {
                "profile.projects": doc
            }
        })
    },
    editPersonalProject: function (obj) {
        let doc = obj.$set;
        if (!doc || !doc.id) {
            throw new Meteor.Error("Projects edit data or id not found");
        }
        check(doc, Schemas.PersonalProject);
        checkIsUser();
        Meteor.users.update({"_id": Meteor.userId(), "profile.projects.id": doc.id}, {
            $set: {
                "profile.projects.$.id": doc.id,
                "profile.projects.$.projectName": doc.projectName || null,
                "profile.projects.$.description": doc.description || null,
                "profile.projects.$.imageId": doc.imageId || null
            }
        })
    },

    removePersonalProject: function (id) {
        checkIsUser();
        Meteor.users.update(Meteor.userId(), {
            $pull: {
                "profile.projects": {"id": id}
            }
        })
    },

    clearTempAvatars: function (protectedId) {
        if (!Meteor.userId()) {
            return null;
        }
        let actualAvatarId = Meteor.user().profile && Meteor.user().profile.photoId;
        Avatars.find({owner: Meteor.userId()}).forEach(function (doc) {
            if (doc._id === actualAvatarId || doc._id === protectedId) {
                return true;
            }
            Avatars.remove(doc._id, function (err) {
                if (err) {
                    console.error(err);
                }
            });
        })

    },

    clearProjectImages: function (protectedId) {
        if (!Meteor.userId()) {
            return null;
        }
        let userProjects = Meteor.user().profile && Meteor.user().profile.projects || [];
        let userImageIds = userProjects.map(function (el) {
            return el.imageId;
        }).filter((el) => !!el);
        UserImages.find({owner: Meteor.userId()}).forEach(function (doc) {
            if (userImageIds.indexOf(doc._id) !== -1 || doc._id === protectedId) {
                return true;
            }
            UserImages.remove(doc._id, function (err) {
                if (err) {
                    console.error(err);
                }
            });
        })

    }

});

