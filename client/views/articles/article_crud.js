Template.insertArticleForm.events({
    'input #insertArticleForm input[name="title"]': function (e) {
        e.preventDefault();
        let $slug = document.querySelector("#insertArticleForm input[name='slug']");
        let date = new Date();
        $slug.value = URLify2(`${e.target.value}-${date.getDate()}-${date.getMonth()}-${date.getUTCFullYear()}`);
    }
});

AutoForm.addHooks(["insertArticleForm", "updateArticleForm"], {
    onSuccess: function (doc) {
        Router.go("home");
    }

});