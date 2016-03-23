Template.articleList.onCreated(function () {
    Session.set("article-word", "");
});

Template.articleList.helpers({
    filter: function () {
        const dict = {};
        if (Session.get("article-word")) {
            const regExpr = {$regex: Session.get("article-word"), $options: '-i'};
            dict["$or"] = [
                {title: regExpr},
                {short: regExpr}
            ]
        }
        return dict;
    }
});

Template.articleList.events({
    "input #inputArticleWord": _.debounce(function (e) {
        const value = e.target.value;
        if (!Session.equals("article-word", value)) {
            Session.set("article-word", value);
        }
    }, 300)

});