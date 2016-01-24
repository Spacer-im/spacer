Schemas = {};

Schemas.ifNewId = function () {
    if (!this.value) {
        return Random.id();
    }
};