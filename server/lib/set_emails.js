SetEmails = {
    noreply: function() {
        let noreplyEmail = Meteor.settings.emails && Meteor.settings.emails.noreply;
        if (noreplyEmail) {
            process.env.MAIL_URL = 'smtp://' +
                encodeURIComponent(noreplyEmail.username) + ':' +
                encodeURIComponent(noreplyEmail.password) + '@' +
                encodeURIComponent(noreplyEmail.server) + ':' + noreplyEmail.port;
        }
    }
};