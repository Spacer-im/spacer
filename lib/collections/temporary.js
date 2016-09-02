TempArticles = new Mongo.Collection('tempArticles');

TempArticles.attachSchema(new SimpleSchema({
    authorId: {
        type: String,
        label: "Author Id",
        unique: true
    },
    text: {
        type: String,
        label: "Text"
    }
}));

