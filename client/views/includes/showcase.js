Template.showcase.helpers({
   pagePhrase: function () {
       return Session.get("pagePhrase") || "Participate in space exploration and launch your space career";
   },
    pageTitle: function () {
        return Session.get("pageTitle") || "Spacer";
    }
});