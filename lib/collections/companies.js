Companies = new Mongo.Collection('companies');

Schemas.Company = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        min: 1,
        max: 500
    },
    thumbId: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: "cfs-file",
                collection: "thumbs"
            }
        }
    },
    short: {
        type: String,
        label: "Short",
        optional: true,
        autoform: {
            rows: 2
        }
    },
    description: {
        type: String,
        label: "Description",
        autoform: {
            rows: 30,
            type: "markdown"
        }
    },
    tags: {
        type: [String],
        optional: true,
        label: "Tags",
        autoform: {
            options: Tags.helpers.asOptions
        }
    },
    website: {
        type: String,
        label: "Website",
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    size: {
        type: String,
        label: "Company Size",
        optional: true

    },
    companyType: {
        type: String,
        label: "Company Type",
        optional: true
    },

    revenue: {
        type: String,
        label: "Revenue",
        optional: true
    },
    headquaters: {
        type: String,
        label: "Headquaters",
        optional: true
    },
    founded: {
        type: String,
        label: "Founded",
        optional: true
    },
    industry: {
        type: String,
        label: "Industry",
        optional: true
    },

    competitors: {
        type: String,
        label: "Competitors",
        optional: true
    },

    glassDoorId: {
        type: Number,
        optional: true,
        label: "GlassDoor ID"
    },
    glassDoorData: {
        type: Object,
        optional: true,
        blackbox: true,
        label: "GlassDoor"
    },
    submitted: {
        type: Date,
        autoform: {
            afFieldInput: {
                type: "bootstrap-datetimepicker"
            }
        }
    }
});

Schemas.CompanyV2 = new SimpleSchema([Schemas.Company, {
    slug: {
        type: String,
        label: "Slug (don't change it if it isn't required)",
        unique: true
    }
}]);


let migrationName = Migrations.Names.ADD_COMPANIES_SLUG;

// TODO I don't like this mechanism

if (Meteor.isServer) {
    if (Migrations.required(migrationName)) {
        Migrations.start(migrationName, Migrations.addCompaniesSlug, function () {
                console.info(`Migration ${migrationName} completed`);
                MigrationLog.update({"migrationName": migrationName}, {$set: {"status": Migrations.STATUS_DONE}});
                Companies.attachSchema(Schemas.CompanyV2);
            }
        );
    }
    else {
        Companies.attachSchema(Schemas.CompanyV2);
    }
}
else {
    Companies.attachSchema(Schemas.CompanyV2);
}



Companies.helpers({
    imageURL: function () {
        let tId = Thumbs.findOne(this.thumbId);
        return this.thumbId && tId ? tId.url() : '/icons/logo_rocket.png';
    },
    gdRating: function () {
        return this.glassDoorData && this.glassDoorData.overallRating;
    },
    industryName: function () {
        return (this.glassDoorData && this.glassDoorData.industryName) || this.industry;
    }
});





