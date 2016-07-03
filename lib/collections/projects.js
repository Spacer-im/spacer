Projects = new Mongo.Collection('projects');

Projects.attachSchema(Schemas.Project);

Projects.helpers({
    thumbURL: function (auth=true) {
        const imageId = this.listImageId || this.imageId;
        const tId = Images.findOne(imageId);
        return imageId && tId ? tId.url({auth: auth}) : '/icons/logo_rocket.png';
    },
    fullImageURL: function (auth=true) {
        let tId = Images.findOne(this.imageId);
        return this.imageId && tId ? tId.url({store: "fullImages", auth: auth}) : null;
    }
});
