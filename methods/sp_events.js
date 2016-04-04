function sendEmailAboutEvent(userEmail, name) {
    const nl = '\r\n';
    Email.send({
        to: userEmail,
        from: 'Spacer mailbot <noreply@spacer.im>',
        subject: 'Spacer Hackathon Registration Confirmation',
        text: `Dear ${name},\r\n\r\n` +
        "Thank you for registering for the Spacer Hackathon." +
        " This is the first of its kind event in Ukraine " +
        "where we want to bring together the brightest and most curious about space minds.\r\n\r\n" +

        "We have decided to keep this event more friendly and personal, and this is why there is a limited amount of spots. " +
        "If chosen, you will get a notification from us with further details in the nearest future.\r\n\r\n" +

        "If you want to share more why you'd like to participate in the Spacer Hackathon," +
        " we will be hyped to hear from you at info@spacer.im. " +
        "Also, if you have any questions or suggestions please don't hesitate to drop us a line at the same address.\r\n\r\n" +

        "Thank you and we hope to see you at the event!\r\n\r\n" +

        "Spacer team",
        replyTo: "info@spacer.im"
    });
}

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
                const user = Meteor.user();
                if (user.emails && user.emails[0] && user.emails[0].verified) {
                    sendEmailAboutEvent(user.emails[0].address, user.profile.firstName || user.username);
                }
                return res;
            });
    }
});