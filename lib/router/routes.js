Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});

//Router.onBeforeAction('dataNotFound');

Router.onAfterAction(function () {
    let seoFunction = SEOFunctions && SEOFunctions[Router.current().route.getName()];
    if (seoFunction) {
        seoFunction(this.data);
    }

}, {where: "client"});

Router.route('/login', {
    name: RouteNames.LOGIN,
    onBeforeAction: function () {
        if (Meteor.user()) {
            if (this.params.query && this.params.query.next) {
                Router.go("/" + this.params.query.next);
            }
            else {
                Router.go("/profile");
            }
        }
        this.next();
    }
});


Router.route('/', {
    name: RouteNames.HOME,
    layoutTemplate: "contentSidebarRight"
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
    }
});

Router.route('/article-add', {
    name: 'insertArticleForm'
});

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
    layoutTemplate: "contentSidebarLeft"
});

Router.route('/companies/:slug', {
    name: RouteNames.COMPANY_PAGE,
    layoutTemplate: "contentSidebarRight",
    waitOn: function () {
        return Meteor.subscribe('company', this.params.slug);
    },
    data: function () {
        return Companies.findOne({slug: this.params.slug});
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
    name: RouteNames.JOBS,
    layoutTemplate: "contentSidebarLeft"
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
    name: RouteNames.JOB_PAGE,
    waitOn: function () {
        return Meteor.subscribe('job', this.params.slug);
    },
    data: function () {
        return Jobs.findOne({slug: this.params.slug});
    },
    layoutTemplate: "contentSidebarRight"
});

// PROJECTS

Router.route('/projects', {
    name: RouteNames.PROJECTS,
    layoutTemplate: "contentSidebarLeft"
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
    name: RouteNames.PROJECT_PAGE,
    waitOn: function () {
        return Meteor.subscribe('project', this.params.slug);
    },
    data: function () {
        return Projects.findOne({slug: this.params.slug});
    },
    layoutTemplate: "contentSidebarRight"
});

// EVENTS

Router.route('/events', {
    name: RouteNames.SP_EVENTS,
    waitOn: function () {
        return Meteor.subscribe('spEvents');
    },
    onBeforeAction: function () {
        var doc = SpEvents.findOne({mainRedirect: true}) || SpEvents.find({}, {sort: {createdAt: 1}}).fetch()[0];
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
    name: RouteNames.SP_EVENT_PAGE,
    waitOn: function () {
        return Meteor.subscribe('spEvent', this.params.slug);
    },
    data: function () {
        return SpEvents.findOne({slug: this.params.slug});
    },
    layoutTemplate: "eventSidebarRight"
});

Router.route('/events/:slug/report', {
    name: RouteNames.SP_EVENT_PAGE_REPORT,
    waitOn: function () {
        return Meteor.subscribe('spEventRegistrations', this.params.slug);
    },
    data: function () {
        const spEvent = SpEvents.findOne({slug: this.params.slug});
        const registrations = spEvent ? SpEventRegistrations.find({eventId: spEvent._id}, {sort: {createdAt: 1}}) : [];
        return {spEvent, registrations}
    },
    layoutTemplate: "contentSidebarRight"
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
    name: RouteNames.USER_PAGE,
    layoutTemplate: "contentCenter",
    waitOn: function () {
        return Meteor.subscribe("profile", this.params.username);
    },
    data: function () {
        return Meteor.users.findOne({"username": this.params.username})
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
    }
});

// Settings
Router.route('/settings', {
    name: "userSettings",
    layoutTemplate: "contentCenter",
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

// Custom Pages

Router.route('/about', customPageRoute('about', RouteNames.ABOUT_PAGE));
Router.route('/contact', customPageRoute('contact', RouteNames.CONTACT_PAGE));
Router.route('/terms', customPageRoute('terms', RouteNames.TERMS_PAGE));
Router.route('/privacy', customPageRoute('privacy', RouteNames.PRIVACY_PAGE));
Router.route('/community', {
    name: RouteNames.COMMUNITY_PAGE,
    layoutTemplate: "contentCenterNarrow",
    waitOn: function () {
        return Meteor.subscribe("customPage", "community");
    },
    data: function () {
        return CustomPages.findOne({"slug": "community"})
    }
});


Router.route('/admin/lists', {
    name: "userListPage",
    layoutTemplate: "contentCenterNarrow",
    waitOn: function () {
        return Meteor.subscribe("spEvents", Meteor.user().username);
    },
    data: function () {
        return SpEvents.find({});
    }
});
