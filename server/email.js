Meteor.startup(function () {
    let noreplyEmail = Meteor.settings.emails && Meteor.settings.emails.noreply;
    if (noreplyEmail) {
        process.env.MAIL_URL = 'smtp://' +
            encodeURIComponent(noreplyEmail.username) + ':' +
            encodeURIComponent(noreplyEmail.password) + '@' +
            encodeURIComponent(noreplyEmail.server) + ':' + noreplyEmail.port;
    }

    Accounts.emailTemplates.from = 'Spacer.im registration ';
    Accounts.emailTemplates.siteName = 'spacer.im';
    Accounts.emailTemplates.verifyEmail.subject = function(user) {
        return 'Confirm Your Email Address for Spacer.im';
    };
    Accounts.emailTemplates.verifyEmail.text = function(user, url) {
        return 'Thank you for registering.  Please click on the following link to verify your email address: \r\n' + url;
    };

    Accounts.config({
        sendVerificationEmail: true
    });

});