SEOFunctions = {};

RouteNames = {
    HOME: "home",
    ARTICLE: "Article",
    COMPANIES: 'companyList',
    COMPANY_DESCRIPTION: 'companyDescription',
    USER_INFO: 'userProfile',
    ABOUT_PAGE: 'aboutPage',
    CONTACT_PAGE: 'contactPage',
    TERMS_PAGE: 'termsPage',
    PRIVACY_PAGE: 'privacyPage'
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
}