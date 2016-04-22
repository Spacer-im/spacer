SyncedCron.add({
    name: 'Get data from GlassDoor',
    schedule: function (parser) {
        // parser is a later.parse object
        return parser.text(Meteor.settings.cron.glassDoorUpdateTime);
    },
    job: function () {
        let text = "Results for companies update:\r\n\r\n";
        Companies.find().forEach(function (c) {
            text += `${c.name} -- ${c.glassDoorId} -- `;
            if (c.glassDoorId) {
                let data = GlassDoor.getInfo(c.name, c.glassDoorId);
                text += `${data.overallRating} \r\n`;
                Companies.update(c._id, {$set: {glassDoorData: data}});
            }
        });

        if (Meteor.settings.cron.reportAddress) {
            if (!process.env.MAIL_URL) {
                SetEmails.noreply();
            }
            Email.send({
                "from": "noreply@spacer.im",
                "to": Meteor.settings.cron.reportAddress,
                "subject": `glassDoor update for ${new Date()}`,
                "text": text
            });
        }
    }
});

//if (Meteor.settings.cron && Meteor.settings.cron.enable) {
    //SyncedCron.start();
//}