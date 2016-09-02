
Template.insertArticleForm.onRendered(function () {
    this.subscribe("tempArticle", onReady = () => {
        let $text = document.querySelector("#insertArticleForm textarea[name='text']");
        const temp = TempArticles.findOne({authorId: Meteor.userId()});
        if ($text && temp) {
            $text.value = temp.text;
        }
    });
    this.autosaveInterval = setInterval(() => {
        let $text = document.querySelector("#insertArticleForm textarea[name='text']");
        if ($text) {
            Meteor.call("saveTempArticle", $text.value);
        }

    }, 30000);
});

Template.insertArticleForm.onDestroyed(function () {
    clearInterval(this.autosaveInterval);
});

Template.insertArticleForm.events({
    'input #insertArticleForm input[name="title"]': function (e) {
        e.preventDefault();
        let $slug = document.querySelector("#insertArticleForm input[name='slug']");
        let date = new Date();
        $slug.value = URLify2(`${e.target.value}-${moment(date).format('YYYY-MM-DD')}`);
    }
    //'input #insertArticleForm textarea[name="text"]': _.debounce(function (e) {
    //
    //}, 300)
});

AutoForm.addHooks(["insertArticleForm", "updateArticleForm"], {
    onSuccess: function (doc) {
        Router.go("home");
    }

});