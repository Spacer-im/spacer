SpEvents = new Mongo.Collection('spEvents');

SpEvents.attachSchema(Schemas.SpEventInfo);

SpEventRegistrations = new Mongo.Collection('spEventRegistrations');

SpEventRegistrations.attachSchema(Schemas.SpEventRegistration);
