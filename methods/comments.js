Meteor.methods({
    addProjectComment: function (projectId, text) {
        check(projectId, String);
        check(text, String);
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        if (!Projects.findOne(projectId)) {
            throw new Meteor.Error(`A project with id ${projectId} doesn't exist`);
        }
        ProjectComments.insert({"docId": projectId, "authorId": Meteor.userId(), "text": text}, function (err, res) {
            return res;
        });
    }
});