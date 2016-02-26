Events = new Mongo.Collection('events');

Events.attachSchema(Schemas.EventInfo);

EventRegistrations = new Mongo.Collection('eventRegistrations');

EventRegistrations.attachSchema(Schemas.EventRegistration);
