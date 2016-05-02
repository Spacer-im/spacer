Articles = new Mongo.Collection('articles');

// TODO move options in UI

Schemas.Article._schema.tags.autoform = {options: Tags.helpers.asOptions};

Articles.attachSchema(Schemas.Article);

Articles.helpers({
    thumbURL: function (auth = true) {
        const image = Images.findOne(this.imageId);
        return this.imageId && image ?
            image.url({store: "thumbImages", auth: auth}) :
            `/assets/small_random/${Math.floor(Math.random() * 10)}.jpg`;
    },
    imageURL: function (auth = true) {
        const image = Images.findOne(this.imageId);
        return image && image.url({store: "fullImages", auth: auth});
    }
});

if (Meteor.isServer) {
    Articles.after.insert(function (userId, doc) {
        const slackUrl = Meteor.settings.Slack && Meteor.settings.Slack.articleHook;
        const rootUrl = Meteor.settings.rootUrl || "http://example.com";
        if (slackUrl) {
            const articleMessage = `*"${doc.title}"* \n ${doc.short} <${rootUrl}/articles/${doc.slug}|Read here>`;
            HTTP.post(slackUrl, {data: {text: articleMessage}})
        }
    });
}