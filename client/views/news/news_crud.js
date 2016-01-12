Template.insertNewsForm.events({
    'input #insertNewsForm input[name="title"]': function (e) {
        e.preventDefault();
        let $slug = document.querySelector("#insertNewsForm input[name='slug']");
        let date = new Date();
        $slug.value = URLify2(`${date.getDate()}-${date.getMonth()}-${date.getUTCFullYear()}-` + e.target.value);
    }
});

AutoForm.addHooks(["insertNewsForm", "updateNewsForm"], {
    after: {
        insert: function (doc) {
            Router.go(this.insertDoc && this.insertDoc.slug ? `/news/${this.insertDoc.slug}` : "Home");
        },
        update: function (doc) {
            Router.go(this.updateDoc && this.updateDoc.$set && this.updateDoc.$set.slug ?
                `/news/${this.updateDoc.$set.slug}` : "Home");
        }
    }
});