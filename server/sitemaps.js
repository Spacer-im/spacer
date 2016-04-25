sitemaps.add('/sitemap.xml', function () {
    // required: page
    // optional: lastmod, changefreq, priority, xhtmlLinks, images, videos
    let pages = [
        {
            page: '/',
            lastmod: new Date(),
            changefreq: 'daily'
        },
        {
            page: "/community",
            lastmod: new Date(),
            changefreq: 'monthly'
        },
        {
            page: "/terms",
            lastmod: new Date(),
            changefreq: 'monthly'
        },

        {
            page: "/privacy",
            lastmod: new Date(),
            changefreq: 'monthly'
        },

        {
            page: "/about",
            lastmod: new Date(),
            changefreq: 'monthly'
        },

        {
            page: "/contact",
            lastmod: new Date(),
            changefreq: 'monthly'
        },
        {
            page: "/login",
            lastmod: new Date(),
            changefreq: 'monthly'
        }
    ];

    Articles.find({}).forEach((doc) => {
        pages.push({page: `/articles/${doc.slug}`, lastmod: doc.createdAt});
    });

    pages.push({
        page: "/jobs",
        lastmod: Jobs.findOne({}, {sort: {createdAt: -1}}).createdAt || new Date()
    });
    Jobs.find({}).forEach((doc) => {
        pages.push({page: `/jobs/${doc.slug}`, lastmod: doc.createdAt});
    });

    pages.push({
        page: "/jobs",
        lastmod: Projects.findOne({}, {sort: {createdAt: -1}}).createdAt || new Date()
    });
    Projects.find({}).forEach((doc) => {
        pages.push({page: `/projects/${doc.slug}`, lastmod: doc.createdAt});
    });

    pages.push({
        page: "/events",
        lastmod: SpEvents.findOne({}, {sort: {createdAt: -1}}).createdAt || new Date()
    });
    SpEvents.find({}).forEach((doc) => {
        pages.push({page: `/events/${doc.slug}`, lastmod: doc.createdAt});
    });
    pages.push();

    return pages;
});