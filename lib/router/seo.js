if (Meteor.isClient) {
    Meteor.startup(function () {
        return SEO.config({
            title: 'Spacer',
            meta: {
                'description': 'Participate in space exploration and launch your space career',
                "keywords": "Space, aerospace, exploration, job, career, challenge, project, news, open source"
            },
            og: {
                'image': 'http://spacerim.com/icons/logo.png'
            }
        });
    });

}

SEOFunctions[RouteNames.COMPANIES] = function () {
    SEO.set({
        title: "Spacer - Space Industry Companies",
        og: {
            'image': "/icons/logo_rocket.png"
        }
    });
};

SEOFunctions[RouteNames.COMPANY_DESCRIPTION] = function (dataFunc) {
    let data = (dataFunc && dataFunc()) || null;
    if (data) {
        SEO.set({
            title: `Spacer - Company - ${data.name || "NoName"}`,
            "description": data.short || "",
            og: {
                'image': data.imageURL(auth=false)
            }
        });
    }
};

SEOFunctions[RouteNames.ARTICLE] = function (dataFunc) {
    let data = (dataFunc && dataFunc()) || null;
    if (data) {
        SEO.set({
            title: `Spacer - News - ${data.title || ""}`,
            "description": data.short || "",
            og: {
                'image': data.thumbURL(auth=false)
            }
        });
    }
};


SEOFunctions[RouteNames.USER_INFO] = function (dataFunc) {
    let data = (dataFunc && dataFunc()) || null;
    if (data) {
        SEO.set({
            title: `Spacer - ${data.fullName() || ""}`,
            og: {
                'image': data.avatarUrl(auth=false)
            }
        });
    }
};