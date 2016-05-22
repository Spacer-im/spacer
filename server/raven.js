if (Meteor.settings.ravenServerDSN) {
    RavenLogger.initialize({
        server: Meteor.settings.public.ravenServerDSN
    }, {
        patchGlobal: function(isLogged, message) {
            console.log("Uncaught exception: ", message);
            process.exit(1);
        }
    });
}