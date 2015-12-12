Template.showcase.helpers({
   pagePhrase: function () {
       return Session.get("pagePhrase") || "Your space career toolkit";
   },
    pageTitle: function () {
        return Session.get("pageTitle") || "Spacer";
    }
});