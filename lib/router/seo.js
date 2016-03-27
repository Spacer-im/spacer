if (Meteor.isClient) {
    Meteor.startup(function () {
        return SEO.config({
            title: 'Spacer',
            meta: {
                'description': 'Participate in space exploration and launch your space career',
                "keywords": "Space, aerospace, exploration, job, career, challenge, project, news, open source"
            },
            og: {
                'image': Meteor.absoluteUrl('/icons/logo.png')
            }
        });
    });

}

// Dynamic pages

SEOFunctions[RouteNames.COMPANY_PAGE] = function (dataFunc) {
    let data = (dataFunc && dataFunc()) || null;
    if (data) {
        SEO.set({
            title: `Spacer - Company - ${data.name || "NoName"}`,
            meta: {
                "description": data.short || ""
            },
            og: {
                'image': Meteor.absoluteUrl(data.imageURL(auth=false))
            }
        });
    }
};

SEOFunctions[RouteNames.ARTICLE] = function (dataFunc) {
    let data = (dataFunc && dataFunc()) || null;
    if (data) {
        console.log(data.short);
        SEO.set({
            title: `Spacer - News - ${data.title || ""}`,
            meta: {
                "description": data.short || ""
            },
            og: {
                'image': Meteor.absoluteUrl(data.thumbURL(auth=false))
            }
        });
    }
};

SEOFunctions[RouteNames.PROJECT_PAGE] = function (dataFunc) {
    let data = (dataFunc && dataFunc()) || null;
    if (data) {
        SEO.set({
            title: `Spacer - Project - ${data.name || ""}`,
            meta: {
                "description": data.short || ""
            },
            og: {
                'image': Meteor.absoluteUrl(data.thumbURL(auth=false))
            }
        });
    }
};


SEOFunctions[RouteNames.USER_PAGE] = function (dataFunc) {
    let data = (dataFunc && dataFunc()) || null;
    if (data) {
        SEO.set({
            title: `Spacer - Profile - ${data.fullName() || ""}`,
            meta: {
                description: (data.profile && data.profile.calling) || `About ${data.fullName() || ""}`
            },
            og: {
                'image': Meteor.absoluteUrl(data.avatarUrl(auth=false))
            }
        });
    }
};

SEOFunctions[RouteNames.JOB_PAGE] = function (dataFunc) {
    let data = (dataFunc && dataFunc()) || null;
    console.log(data);
    if (data) {
        SEO.set({
            title: `Spacer - Careers - ${data.title || ""}`,
            meta: {
                description: (data.description || "").substring(0, 512)
            }
        });
    }
};

SEOFunctions[RouteNames.SP_EVENT_PAGE] = function (dataFunc) {
    let data = (dataFunc && dataFunc()) || null;
    if (data) {
        SEO.set({
            title: `Spacer - Events - ${data.title || ""}`,
            meta: {
                description: (data.text || "").substring(0, 512)
            }
        });
    }
};