ProjectComments = new Mongo.Collection('projectComments');

ProjectComments.attachSchema(Schemas.Comment);

ProjectComments.helpers({
    avatarURL: function () {
        const author = Meteor.users.findOne(this.authorId);
        if (author && author.profile && author.profile.photoId) {
            const photo = Avatars.findOne(author.profile.photoId);
            if (photo) {
                return photo.url();
            }
        }
        return '/icons/logo_rocket.png';
    },
    authorName: function() {
        const author = Meteor.users.findOne(this.authorId);
        return author ? author.fullName() : "Unknown";
    },
    createdAtReadable: function () {
        return moment(this.createdAt).fromNow();
    }
});
