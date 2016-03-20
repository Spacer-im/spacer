Template.insertArticleForm.events({
    'input #insertArticleForm input[name="title"]': function (e) {
        e.preventDefault();
        let $slug = document.querySelector("#insertArticleForm input[name='slug']");
        let date = new Date();
        $slug.value = URLify2(`${e.target.value}-${moment(date).format('YYYY-MM-DD')}`);
    }
});

AutoForm.addHooks(["insertArticleForm", "updateArticleForm"], {
    onSuccess: function (doc) {
        Router.go("home");
    }

});