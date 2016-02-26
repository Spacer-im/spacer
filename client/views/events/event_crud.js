AutoForm.addHooks(["insertEventForm", "updateEventForm"], {
    onSuccess: function(formType, result) {
        Router.go("/events/");
    }
});

Template.insertEventForm.events({
    'input #insertEventForm input[name="name"]': function (e) {
        e.preventDefault();
        let $slug = document.querySelector("#insertEventForm input[name='slug']");
        $slug.value = URLify2(e.target.value);
    }
});