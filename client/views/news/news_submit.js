Template.insertNewsForm.events({
    'input #insertNewsForm input[name="title"]': function (e) {
        e.preventDefault();
        let $slug = document.querySelector("#insertNewsForm input[name='slug']");
        let date = new Date();
        $slug.value = URLify2(`${date.getDate()}-${date.getMonth()}-${date.getUTCFullYear()}-` + e.target.value);
    }
});

AutoForm.hooks({
    insertNewsForm: {
        after: {
            insert: function (doc) {
                if (this.insertDoc && this.insertDoc.slug) {
                    Router.go(`/news/${this.insertDoc.slug}`);
                }
                else {
                    Router.go("home");
                }

            }
        }
    }
});