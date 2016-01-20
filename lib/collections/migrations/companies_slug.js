var migrationName = "addCompaniesSlug";

Migrations.Names.ADD_COMPANIES_SLUG = migrationName;

Migrations.Data[migrationName] = {
    migrationFunction: function (callback) {
        let data = Companies.find().map((el) => {
            if (!el.slug) {
                let slug = URLify2(`${el.name}`);
                if (Companies.findOne({"slug": slug})) {
                    slug += Random.hexString(2);
                }
                el.slug = slug;
            }
            return el;
        });
        callback = callback || (() => {});
        bulkCollectionUpdate(Companies, data, {
            primaryKey: "_id",
            callback: callback
        });
    }
};