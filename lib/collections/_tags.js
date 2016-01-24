Tags = new Mongo.Collection("tags");


Tags.attachSchema(Schemas.Tag);

Tags.helpers.asOptions = function () {
    return _.map(Tags.find({}).fetch(), function (tag) {
        return {
            label: tag.name,
            value: tag._id
        };
    });
};



