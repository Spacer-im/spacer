Participations = new Mongo.Collection('participations');

Participations.attachSchema(Schemas.Participation);

Participations.helpers({
    avatarURL: function () {
        const author = Meteor.users.findOne(this.authorId);
        if (author && author.profile && author.profile.photoId) {
            const photo = Avatars.findOne(author.profile.photoId);
            if (photo) {
                return photo.url();
            }
        }
        return '/icons/logo_cut.png';
    },
    authorName: function() {
        const author = Meteor.users.findOne(this.authorId);
        return author ? author.fullName() : "Unknown";
    },
    projectName: function () {
        const project = Projects.findOne(this.projectId);
        return project ? project.name : "Unknown";
    },
    projectSlug: function () {
        const project = Projects.findOne(this.projectId);
        return project ? project.slug : "";
    },

    projectImageUrl: function () {
        const project = Projects.findOne(this.projectId);
        if (project) {
            const image = Images.findOne(project.imageId);
            return image ? image.url() : "/assets/earth.jpg";
        }
        return "/assets/earth.jpg";
    },

    createdAtReadable: function () {
        return moment(this.createdAt).fromNow();
    }
});
