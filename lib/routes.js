Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});


Router.route('/login', {name: 'login'});


Router.route('/', {name: 'home'});

Router.route('/news/add', {name: 'insertNewsForm'});

Router.route('/news/:slug', {
    name: 'newsArticle',
    waitOn: function () {
        return Meteor.subscribe('news_article', this.params.slug);
    },
    data: function () {
        console.log(this.params.slug);
        return News.findOne({slug: this.params.slug});
    }
});


Router.route('/jobs', {
    name: 'jobsList',
    waitOn: function () {
        return Meteor.subscribe("jobs_list")
    },
    onAfterAction: function () {
        Session.set("pageTitle", "Space Jobs");
        Session.set("pagePhrase", "Find the next great opportunity");
    },
    data: function () {
        return {jobs: Jobs.find({}, {sort: {submitted: -1}})}
    }
});

Router.route('/jobs/:id', {
    name: 'jobDescription',
    waitOn: function () {
        return Meteor.subscribe('job', this.params.id);
    },
    onAfterAction: function () {
        Session.set("pageTitle", "Space Jobs");
    },
    data: function () {
        let job = Jobs.findOne(this.params.id);
        Session.set("pagePhrase", job ? job.title : "Sorry, we've not found it");
        return job;
    }
});