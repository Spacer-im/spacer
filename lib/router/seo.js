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

SEOFunctions[RouteNames.COMPANY_INFO] = function (dataFunc) {
    let data = (dataFunc && dataFunc()) || {};
    SEO.set({
        title: `Spacer - Company - ${data.name || "NoName"}`,
        og: {
            "description": data.short || "",
            'image': data.imageURL()
        }
    });
};

SEOFunctions[RouteNames.NEWS_ARTICLE] = function (dataFunc) {
    let data = (dataFunc && dataFunc()) || {};
    SEO.set({
        title: `Spacer - News - ${data.title || ""}`,
        og: {
            "description": data.short || "",
            'image': data.imageURL()
        }
    });
};
