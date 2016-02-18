News = new Mongo.Collection('news');

// TODO move options in UI

Schemas.PieceOfNews._schema.tags.autoform = {options: Tags.helpers.asOptions};

News.attachSchema(Schemas.PieceOfNews);

News.helpers({
    thumbURL: function (auth = true) {
        const image = Images.findOne(this.imageId);
        return this.imageId && image ?
            image.url({store: "thumbs", auth: auth}) :
            `/assets/small_random/${Math.floor(Math.random() * 10)}.jpg`;
    },
    coverURL: function () {
        const image = Images.findOne(this.imageId);
        return image && image.url({store: "fullImages"});
    }
});
