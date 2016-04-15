Articles = new Mongo.Collection('articles');

// TODO move options in UI

Schemas.Article._schema.tags.autoform = {options: Tags.helpers.asOptions};

Articles.attachSchema(Schemas.Article);

Articles.helpers({
    thumbURL: function (auth = true) {
        const image = Images.findOne(this.imageId);
        return this.imageId && image ?
            image.url({store: "thumbs", auth: auth}) :
            `/assets/small_random/${Math.floor(Math.random() * 10)}.jpg`;
    },
    imageURL: function (auth = true) {
        const image = Images.findOne(this.imageId);
        return image && image.url({store: "fullImages", auth: auth});
    }
});
