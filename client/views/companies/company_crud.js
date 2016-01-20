AutoForm.addHooks(["insertCompanyForm", "updateCompanyForm"], {
    onSuccess: function(formType, result) {
        Router.go("/companies/");
    }
});

Template.insertCompanyForm.events({
    'input #insertCompanyForm input[name="name"]': function (e) {
        e.preventDefault();
        let $slug = document.querySelector("#insertCompanyForm input[name='slug']");
        $slug.value = URLify2(e.target.value);
    }
});