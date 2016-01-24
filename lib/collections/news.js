News = new Mongo.Collection('news');

// TODO move options in UI

Schemas.PieceOfNews._schema.tags.autoform = {options: Tags.helpers.asOptions};

News.attachSchema(Schemas.PieceOfNews);

News.helpers({
   imageURL: function () {
       let tId = Thumbs.findOne(this.thumbId);
       return this.thumbId && tId ? tId.url() : `/assets/small_random/${Math.floor(Math.random() * 10)}.jpg`;
   }
});