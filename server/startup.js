//AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

Meteor.startup(function () {
    SetEmails.noreply();
    process.env.AWS_ACCESS_KEY_ID = Meteor.settings.aws.accessKeyId;
    process.env.AWS_SECRET_ACCESS_KEY = Meteor.settings.aws.secretAccessKey;
});