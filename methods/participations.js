Meteor.methods({
    upsertProjectParticipation: function (projectId, text) {
        check(projectId, String);
        check(text, String);
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        if (!Projects.findOne(projectId)) {
            throw new Meteor.Error(`A project with id ${projectId} doesn't exist`);
        }
        Participations.upsert({"projectId": projectId, "authorId": Meteor.userId()},
            {$set: {"projectId": projectId, "authorId": Meteor.userId(), "text": text}},
            function (err, res) {
                return res;
            });
    },
    removeProjectParticipation: function (projectId) {
        check(projectId, String);
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        if (!Projects.findOne(projectId)) {
            throw new Meteor.Error(`A project with id ${projectId} doesn't exist`);
        }
        Participations.remove({"projectId": projectId, "authorId": Meteor.userId()},
            (err, res) => res)
    }
});