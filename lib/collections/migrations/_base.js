MigrationLog = new Mongo.Collection("migrations");


Migrations = {
    STATUS_DONE: "done",
    STATUS_CREATED: "created",
    Names: {},
    Data: {}
};

Migrations.required = function (migrationName) {
    let migration = MigrationLog.findOne({"migrationName": migrationName});
    return !migration || migration.status !== this.STATUS_DONE;
};

Migrations.start = function (migrationName, callback) {
    let migrationFunction = this.Data[migrationName].migrationFunction;
    MigrationLog.upsert({"migrationName": migrationName},
            {$set: {
                "migrationName": migrationName,
                "status": this.STATUS_CREATED
            }
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

Migrations.doMigration = function(migrationName, requiredAction) {
    requiredAction = requiredAction || (() => {});
    if (Meteor.isServer) {
        if (Migrations.required(migrationName)) {
            Migrations.start(migrationName, function () {
                    console.info(`Migration ${migrationName} completed`);
                    MigrationLog.update({"migrationName": migrationName}, {$set: {"status": Migrations.STATUS_DONE}});
                    requiredAction();
                }
            );
        }
        else {
            requiredAction();
        }
    }
    else {
        requiredAction();
    }
};