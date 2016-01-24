Professions = new Mongo.Collection("professions");

Migrations.doMigration(Migrations.Names.INIT_FILL_PROFESSIONS, () => {Professions.attachSchema(Schemas.Profession)});
