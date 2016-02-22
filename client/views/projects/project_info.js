Template.projectInfoContent.onCreated(function () {
    this.commentDisabled = ReactiveVar(false);
});

Template.projectInfoContent.helpers({
    addCommentStatus: () => Template.instance().commentDisabled.get() ? "disabled" : "",
    filter: () => Template.instance().data ? {"docId": Template.instance().data._id} : null
});

Template.projectInfoContent.events({
    "submit #commentForm": function (e) {
        e.preventDefault();
        const instance = Template.instance();
        if (addComment.value && instance.data) {
            instance.commentDisabled.set(true);
            Meteor.call("addProjectComment", instance.data._id, addComment.value,
                function (err, res) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        addComment.value = "";
                        instance.commentDisabled.set(false);
                    }
                });
        }
    }
});