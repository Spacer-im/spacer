Template.footer.events({
  "click #subscribe": function (e) {
    e.preventDefault();
    if (!Meteor.userId()) {
      Router.go('/login?subscribe=true');
    } else {
      Meteor.call("subscribeUser", function (error, result) {
        if (!error) {
          Notifications.info('Subscribed', 'You are subscribed!');
        }
      });
    }
  }
});