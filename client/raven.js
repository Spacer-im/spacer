if (Meteor.settings.public.ravenClientDSN) {
    RavenLogger.initialize({
        client: Meteor.settings.public.ravenClientDSN
    });
}