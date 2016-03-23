Meteor.methods({
    registerToEvent: function (eventId, eventRole) {
        check(eventId, String);
        check(eventRole, String);
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        if (!SpEvents.findOne(eventId)) {
            throw new Meteor.Error(`An event with id ${eventId} doesn't exist`);
        }
        SpEventRegistrations.upsert({eventId: eventId, userId: Meteor.userId()},
            {$set: {eventId: eventId, userId: Meteor.userId(), role: eventRole}},
            function (err, res) {
                return res;
            });
    }
});