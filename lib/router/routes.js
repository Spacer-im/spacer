Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});

Router.onAfterAction(function () {
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


Router.route('/', {
    name: RouteNames.HOME,
    layoutTemplate: "contentSidebarRight",
    yieldTemplates: {
        "homeCover": {
            to: "cover"
        },
        "articleList": {
            to: "content"
        },
        "homeSidebar": {
            to: "sidebar"
        }
    }
});

// NEWS

Router.route('/articles/:slug', {
    name: RouteNames.ARTICLE,
    layoutTemplate: "contentSidebarRight",
    waitOn: function () {
        return Meteor.subscribe('article', this.params.slug);
    },
    data: function () {
        return Articles.findOne({slug: this.params.slug});
    },
    yieldTemplates: {
        "articleContent": {
            to: "content"
        },
        "articleCover": {
            to: "cover"
        }
    }
});

Router.route('/article-add', {name: 'insertArticleForm'});
Router.route('/article-update/:slug', {
    name: 'updateArticleForm',
    waitOn: function () {
        return Meteor.subscribe('article', this.params.slug);
    },
    data: function () {
        return Articles.findOne({slug: this.params.slug});
    }
});

// COMPANIES

Router.route('/companies', {
    name: RouteNames.COMPANIES,
    layoutTemplate: "contentSidebarLeft",
    yieldTemplates: {
        "companiesContent": {
            to: "content"
        },
        "companiesCover": {
            to: "cover"
        },
        "companiesSidebar": {
            to: "sidebar"
        }
    }
});

Router.route('/companies/:slug', {
    name: RouteNames.COMPANY_DESCRIPTION,
    layoutTemplate: "contentSidebarRight",
    waitOn: function () {
        return Meteor.subscribe('company', this.params.slug);
    },
    data: function () {
        return Companies.findOne({slug: this.params.slug});
    },
    yieldTemplates: {
        "companyInfoContent": {
            to: "content"
        },
        "companyInfoCover": {
            to: "cover"
        },
        "companyInfoSidebar": {
            to: "sidebar"
        },
        "companyInfoAdmin": {
            to: "adminPanel"
        }

    }
});

Router.route('/company-add', {name: 'insertCompanyForm'});
Router.route('/company-update/:slug', {
    name: 'updateCompanyForm',
    waitOn: function () {
        return Meteor.subscribe('company', this.params.slug);
    },
    data: function () {
        return Companies.findOne({slug: this.params.slug});
    }
});

// JOBS

Router.route('/jobs', {
    name: 'jobList',
    layoutTemplate: "contentSidebarLeft",
    yieldTemplates: {
        "jobsContent": {
            to: "content"
        },
        "jobsCover": {
            to: "cover"
        },
        "jobsSidebar": {
            to: "sidebar"
        }
    }
});


Router.route('/job-add', {
    name: 'insertJobForm'
});

Router.route('/job-update/:slug', {
    name: 'updateJobForm',
    waitOn: function () {
        return Meteor.subscribe('job', this.params.slug);
    },
    data: function () {
        return Jobs.findOne({slug: this.params.slug});
    }
});

Router.route('/jobs/:slug', {
    name: 'jobDescription',
    waitOn: function () {
        return Meteor.subscribe('job', this.params.slug);
    },
    data: function () {
        return Jobs.findOne({slug: this.params.slug});
    },
    layoutTemplate: "contentSidebarRight",
    yieldTemplates: {
        "jobDescription": {
            to: "content"
        },
        "jobInfoCover": {
            to: "cover"
        },
        "jobSidebar": {
            to: "sidebar"
        },
        "jobAdmin": {
            to: "adminPanel"
        }
    }
});

// PROJECTS

Router.route('/projects', {
    name: 'projectList',
    layoutTemplate: "contentSidebarLeft",
    yieldTemplates: {
        "projectsContent": {
            to: "content"
        },
        "projectsCover": {
            to: "cover"
        },
        "projectsSidebar": {
            to: "sidebar"
        }
    }
});

Router.route('/project-add', {
    name: 'insertProjectForm'
});

Router.route('/project-update/:slug', {
    name: 'updateProjectForm',
    waitOn: function () {
        return Meteor.subscribe('project', this.params.slug);
    },
    data: function () {
        return Projects.findOne({slug: this.params.slug});
    }
});

Router.route('/projects/:slug', {
    name: 'projectDescription',
    waitOn: function () {
        return Meteor.subscribe('project', this.params.slug);
    },
    data: function () {
        return Projects.findOne({slug: this.params.slug});
    },
    layoutTemplate: "contentSidebarRight",
    yieldTemplates: {
        "projectInfoContent": {
            to: "content"
        },
        "projectInfoCover": {
            to: "cover"
        },

        "projectInfoBottom": {
            to: "bottom"
        },

        "projectInfoSidebar": {
            to: "sidebar"
        },
        "projectInfoAdmin": {
            to: "adminPanel"
        }
    }
});

// EVENTS

Router.route('/events', {
    name: 'spEventList',
    waitOn: function () {
        return Meteor.subscribe('spEvents');
    },
    onBeforeAction: function () {
        var doc = SpEvents.findOne({});
        if (doc) {
            Router.go(`/events/${doc.slug}`);
        }
        this.next();
    }
});


Router.route('/event-add', {
    name: 'insertEventForm'
});

Router.route('/event-update/:slug', {
    name: 'updateEventForm',
    waitOn: function () {
        return Meteor.subscribe('spEvent', this.params.slug);
    },
    data: function () {
        return SpEvents.findOne({slug: this.params.slug});
    }
});

Router.route('/events/:slug', {
    name: 'eventInfo',
    waitOn: function () {
        return Meteor.subscribe('spEvent', this.params.slug);
    },
    data: function () {
        return SpEvents.findOne({slug: this.params.slug});
    },
    layoutTemplate: "contentSidebarRight",
    yieldTemplates: {
        "spEventInfoContent": {
            to: "content"
        },
        "spEventInfoCover": {
            to: "cover"
        },
        "spEventInfoSidebar": {
            to: "sidebar"
        },
        "spEventInfoAdmin": {
            to: "adminPanel"
        }
    }
});


// PROFILE

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
    layoutTemplate: "contentCenter",
    waitOn: function () {
        return Meteor.subscribe("profile", this.params.username);
    },
    data: function () {
        return Meteor.users.findOne({"username": this.params.username})
    },
    yieldTemplates: {
        "userProfileContent": {
            to: "content"
        }
    }
});

Router.route('/profile-edit', {
    name: "userProfileEdit",
    layoutTemplate: "contentCenter",
    waitOn: function () {
        return Meteor.subscribe("profile", Meteor.user().username);
    },
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
    },
    yieldTemplates: {
        "userProfileEditContent": {
            to: "content"
        }
    }
});

// Custom Pages

Router.route('/about', customPageRoute('about', RouteNames.ABOUT_PAGE));
Router.route('/contact', customPageRoute('contact', RouteNames.CONTACT_PAGE));
Router.route('/terms', customPageRoute('terms', RouteNames.TERMS_PAGE));
Router.route('/privacy', customPageRoute('privacy', RouteNames.PRIVACY_PAGE));

