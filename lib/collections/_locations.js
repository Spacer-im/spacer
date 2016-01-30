Locations = new Mongo.Collection("locations");

Locations.attachSchema(Schemas.LocationSchema);

Locations.helpers.countriesAsOptions = function() {
    return _.map(Locations.find({}).fetch(), function (loc) {
        return {
            label: loc.country,
            value: loc.country
        };
    });
};