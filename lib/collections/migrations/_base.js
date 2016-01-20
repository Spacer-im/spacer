MigrationLog = new Mongo.Collection("migrations");


Migrations = {
    STATUS_DONE: "done",
    STATUS_CREATED: "created",
    Names: {}
};

Migrations.required = function (migrationName) {
    let migration = MigrationLog.findOne({"migrationName": migrationName});
    return !migration || migration.status !== this.STATUS_DONE;
};

Migrations.start = function (migrationName, migrationFunction, callback) {
    MigrationLog.update({"migrationName": migrationName},
        {
            "migrationName": migrationName,
            "status": this.STATUS_CREATED
        },
        function (err, result) {
            if (err) {
                throw new Meteor.Error(`${migrationName} Migration did not start: ${err}`);
            }
            else {
                migrationFunction(callback);
            }
        });
};
