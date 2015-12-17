Meteor.startup(function () {
    let noreplyEmail = Meteor.settings.emails && Meteor.settings.emails.noreply;
    if (noreplyEmail) {
        process.env.MAIL_URL = 'smtp://' +
            encodeURIComponent(noreplyEmail.username) + ':' +
            encodeURIComponent(noreplyEmail.password) + '@' +
            encodeURIComponent(noreplyEmail.server) + ':' + noreplyEmail.port;
    }

    Accounts.emailTemplates.from = 'Spacer mailbot <noreply@spacer.im>';
    Accounts.emailTemplates.siteName = 'spacer.im';
    Accounts.emailTemplates.verifyEmail.subject = function (user) {
        return 'Welcome to Spacer! Please verify your email';
    };
    Accounts.emailTemplates.verifyEmail.text = function (user, url) {
        return 'Hello, Spacer!\r\n\r\n' +
            'Thank you for registering at our Web Space Station.' +
            ' Please click on the following link to verify your email address:\r\n' +
            url +
            "\r\n" +
            "Here at Spacer[http://spacer.im/] you'll always stay updated with the latest news about space exploration, " +
            "you'll see the most interesting career opportunities and get a chance to develop a solid space resume " +
            "by showing your practical skills. Oh, and by the way, you might find likely minded Spacers to connect " +
            "with and possibly to cooperate on real space projects.\r\n\r\n" +
            "3... 2... 1... Liftoff!\r\n\r\n" +
            "Spacer team";
    };

    Accounts.config({
        sendVerificationEmail: true
    });

});