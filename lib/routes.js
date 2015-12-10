Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

Router.route('/', {
    name: 'home',
    onAfterAction: function () {
        Session.set("pageTitle", null);
        Session.set("pagePhrase", null);

    }
});

Router.route('/news', {
    name: 'newsList',
    waitOn: function () {
        return Meteor.subscribe("news_titles")
    },
    onAfterAction: function () {
        Session.set("pageTitle", "Space News");
        Session.set("pagePhrase", "The most interesting news from the human space");
    },
    data: function () {
        return {news: News.find({}, {sort: {submitted: -1}})}
    }
});

Router.route('/news/:id', {
    name: 'newsArticle',
    waitOn: function () {
        return Meteor.subscribe('news_article', this.params.id);
    },
    onAfterAction: function () {
        Session.set("pageTitle", "Space News");
    },
    data: function () {
        let article = News.findOne(this.params.id);
        Session.set("pagePhrase", article ? article.title : "Sorry, we've not found it");
        return article;
    }
});