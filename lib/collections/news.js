News = new Mongo.Collection('news');

// TODO move options in UI

Schemas.PieceOfNews._schema.tags.autoform = {options: Tags.helpers.asOptions};

News.attachSchema(Schemas.PieceOfNews);

News.helpers({
    imageURL: function (auth=true) {
        if (this.thumbUrl) {
            return this.thumbUrl;
        }
        else {
            let tId = NewsImages.findOne(this.imageId);
            return this.imageId && tId ? tId.url({store: "newsThumbs", auth: auth}) : `/assets/small_random/${Math.floor(Math.random() * 10)}.jpg`;
        }
    },
    coverURL: function() {
        let image = NewsImages.findOne(this.imageId);
        return image && image.url({store: "newsCovers"});
    }
});

News.before.insert(function (userId, doc) {
    let image = NewsImages.findOne(doc.imageId);
    if (image) {
        doc.thumbUrl = image.url({store: "newsThumbs", auth: false});
    }
});

News.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    let image = NewsImages.findOne(doc.imageId);
    if (image) {
        doc.thumbUrl = image.url({store: "newsThumbs", auth: false});
    }
});