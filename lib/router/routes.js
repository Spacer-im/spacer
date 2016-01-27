Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});

Router.onAfterAction(function() {
    let seoFunction = SEOFunctions && SEOFunctions[Router.current().route.getName()];
    if (seoFunction) {
        seoFunction(this.data);
    }

}, {where: "client"});


Router.route('/login', {
    name: 'login',
    onBeforeAction: function () {
        if (Meteor.user()) {
            Router.go("/profile");
        }
        this.next();
    }
});


Router.route('/', {name: RouteNames.HOME, layoutTemplate: "homeLayout"});

Router.route('/news/add', {name: 'insertNewsForm'});
Router.route('/news/update/:id', {
    name: 'updateNewsForm',
    waitOn: function () {
        return Meteor.subscribe('news_by_id', this.params.id);
    },
    data: function () {
        return News.findOne(this.params.id);
    }
});

Router.route('/news/:slug', {
    name: RouteNames.NEWS_ARTICLE,
    waitOn: function () {
        return Meteor.subscribe('news_by_slug', this.params.slug);
    },
    data: function () {
        return News.findOne({slug: this.params.slug});
    },
    yieldTemplates: {
        "newsCover": {
            to: "showHead"
        }
    }
});


Router.route('/companies', {
    name: RouteNames.COMPANIES
});

Router.route('/companies/add', {name: 'insertCompanyForm'});
Router.route('/companies/update/:id', {
    name: 'updateCompanyForm',
    waitOn: function () {
        return Meteor.subscribe('company', this.params.id);
    },
    data: function () {
        return Companies.findOne(this.params.id);
    }
});

Router.route('/companies/:slug', {
    name: RouteNames.COMPANY_INFO,
    waitOn: function () {
        return Meteor.subscribe('company', this.params.slug);
    },

    data: function () {
        return Companies.findOne({slug: this.params.slug});
    }
});


Router.route('/jobs/:id', {
    name: 'jobDescription',
    waitOn: function () {
        return Meteor.subscribe('job', this.params.id);
    },
    data: function () {
        let job = Jobs.findOne(this.params.id);
        Session.set("pagePhrase", job ? job.title : "Sorry, we've not found it");
        return job;
    }
});

Router.route('/profile/', {
    name: "myProfile",
    onBeforeAction: function () {
        if (!Meteor.user()) {
            Router.go("/login");
        }
        Router.go(`/profile/${Meteor.user().username}`);

    }
});

Router.route('/profile/:username', {
    name: "userProfile",
    waitOn: function () {
        return Meteor.subscribe("userProfile", this.params.username);
    },
    data: function () {
        return Meteor.users.findOne({"username": this.params.username})
    }
});

Router.route('/profile-edit', {
    name: "userProfileEdit",
    onBeforeAction: function () {
        if (!Meteor.user()) {
            Router.go("/login");
        }
        else {
            this.next();
        }
    },
    data: function () {
        return Meteor.user();
    }
});

