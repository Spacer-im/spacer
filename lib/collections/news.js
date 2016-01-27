News = new Mongo.Collection('news');

// TODO move options in UI

Schemas.PieceOfNews._schema.tags.autoform = {options: Tags.helpers.asOptions};

News.attachSchema(Schemas.PieceOfNews);

News.helpers({
    imageURL: function () {
        if (this.thumbUrl) {
            return this.thumbUrl;
        }
        else {
            let tId = Thumbs.findOne(this.imageId);
            return this.thumbUrl ? tId.url({store: "newsThumbs"}) : `/assets/small_random/${Math.floor(Math.random() * 10)}.jpg`;
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