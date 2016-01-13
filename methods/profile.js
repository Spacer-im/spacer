Meteor.methods({
    saveProfile: function (doc) {
        check(doc, Schemas.UserProfile);
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        let links = doc.links || {};
        Meteor.users.update(Meteor.userId(), {
            $set: {
                "profile.photoId": doc.photoId,
                "profile.firstName": doc.firstName,
                "profile.lastName": doc.lastName,
                "profile.calling": doc.calling,
                "profile.summary": doc.summary,
                "profile.links.website": links.website,
                "profile.links.linkedin": links.linkedin,
                "profile.links.twitter": links.twitter,
                "profile.links.facebook": links.facebook,
                "profile.links.github": links.github,
                "profile.links.gplus": links.gplus
            }
        });
    },
    addEducation: function(doc) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        doc.id = Random.id();
        check(doc, Schemas.Education);
        Meteor.users.update(Meteor.userId(), {
            $push: {
                "profile.education": doc
            }
        })
    },
    editEducation: function(obj) {
        let doc = obj.$set;
        if (!doc || !doc.id) {
            throw new Meteor.Error("Education edit data or id not found");
        }
        check(doc, Schemas.Education);
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Meteor.users.update({"_id": Meteor.userId(), "profile.education.id": doc.id}, {
            $set: {
                "profile.education.$.id": doc.id,
                "profile.education.$.schoolName": doc.schoolName,
                "profile.education.$.gradeYear": doc.gradeYear,
                "profile.education.$.fieldOfStudy": doc.fieldOfStudy
            }
        })
    },

    removeEducation: function(id) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Meteor.users.update(Meteor.userId(), {
            $pull: {
                "profile.education": {"id": id}
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
            Avatars.remove(doc._id);
        })

    }
});

