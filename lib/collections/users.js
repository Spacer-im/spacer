Meteor.users.attachSchema(Schemas.User);

Meteor.users.helpers({
    avatarUrl: function () {
        let photo = Avatars.findOne(this.profile.photoId);
        return (photo && photo.url()) || (Meteor.settings.defaultPhotoUrl || "/icons/logo-cut.png");
    },
    fullName: function () {
        if (this.profile.firstName || this.profile.lastName) {
            return `${this.profile.firstName || ""} ${this.profile.lastName || ""}`;
        }
        else {
            return this.username;
        }
    }
});