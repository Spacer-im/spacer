AutoForm.addHooks(["insertProjectForm", "updateProjectForm"], {
    onSuccess: function(formType, result) {
        Router.go("/projects/");
    }
});

Template.insertProjectForm.events({
    'input #insertProjectForm input[name="name"]': function (e) {
        e.preventDefault();
        let $slug = document.querySelector("#insertProjectForm input[name='slug']");
        $slug.value = URLify2(e.target.value);
    }
});