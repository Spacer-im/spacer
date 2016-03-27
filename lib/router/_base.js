SEOFunctions = {};

RouteNames = {
    HOME: "home",
    LOGIN: "login",
    ARTICLE: "article",
    COMPANIES: 'companyList',
    COMPANY_PAGE: 'companyPage',
    PROJECTS: 'projectList',
    PROJECT_PAGE: 'projectPage',
    SP_EVENTS: 'spEventList',
    SP_EVENT_PAGE: 'spEventPage',
    JOBS: 'jobList',
    JOB_PAGE: 'jobPage',
    USER_PAGE: 'profilePage',
    ABOUT_PAGE: 'aboutPage',
    CONTACT_PAGE: 'contactPage',
    TERMS_PAGE: 'termsPage',
    PRIVACY_PAGE: 'privacyPage',
    COMMUNITY_PAGE: 'communityPage'
};

customPageRoute = function(slug, name) {
    return {
        name: name,
        layoutTemplate: "contentCenterNarrow",
        waitOn: function () {
            return Meteor.subscribe("customPage", slug);
        },
        data: function () {
            return CustomPages.findOne({"slug": slug})
        },
        yieldTemplates: {
            "customPageContent": {
                to: "content"
            }
        }
    }
};