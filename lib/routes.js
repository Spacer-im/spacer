Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});


Router.route('/login', {name: 'login'});


Router.route('/', {name: 'home', layoutTemplate: "homeLayout"});

Router.route('/news/add', {name: 'insertNewsForm'});

Router.route('/news/:slug', {
    name: 'newsArticle',
    waitOn: function () {
        return Meteor.subscribe('news_article', this.params.slug);
    },
    data: function () {
        return News.findOne({slug: this.params.slug});
    }
});



Router.route('/companies', {name: 'companyList'});
Router.route('/companies/add', {name: 'insertCompanyForm'});
Router.route('/companies/:id', {
    name: 'companyInfo',
    waitOn: function () {
        return Meteor.subscribe('company', this.params.id);
    },
    data: function() {
        return Companies.findOne(this.params.id)
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