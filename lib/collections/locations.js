Locations = new Mongo.Collection("locations");

Schemas.LocationSchema = new SimpleSchema({
    country: {
        type: String,
        label: "Location"
    }
});

Locations.attachSchema(Schemas.LocationSchema);