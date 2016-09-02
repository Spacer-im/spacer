Meteor.methods({
    saveTempArticle: function (text) {
        const userId = Meteor.userId();
        if (!userId || !Roles.userIsInRole(userId, ['admin'])) {
            throw new Meteor.Error("not-authorized");
        }
        TempArticles.upsert({authorId: userId}, {$set: {authorId: userId, text: text}});
    }
});