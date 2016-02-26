Schemas = {};

Schemas.ifNewId = function () {
    if (!this.value) {
        return Random.id();
    }
};

Schemas.autoDateInsert = function () {
    if (this.isInsert) {
        return new Date();
    } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
    } else {
        this.unset();  // Prevent user from supplying their own value}
    }
};

Schemas.autoDateUpdate = function() {
    if (this.isUpdate) {
        return new Date();
    }
};
