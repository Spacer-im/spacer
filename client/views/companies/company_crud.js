AutoForm.addHooks(["insertCompanyForm", "updateCompanyForm"], {
    after: {
        insert: function (doc) {
            Router.go(this.insertDoc && this.insertDoc._id ? `/news/${this.insertDoc._id}` : "home");
        },
        update: function (oldDoc, newDoc) {
            console.log(oldDoc, newDoc);
            console.log(this);
            Router.go(this.docId ? `/companies/${this.docId}` : "home");
        }
    }
});