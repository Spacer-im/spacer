Template.projectInfoContent.onCreated(function () {
    this.commentDisabled = ReactiveVar(false);
    this.editParticipation = ReactiveVar(false);
});

function findUserParticipation(userId, data) {
    if (userId && data) {
        const participation = Participations.findOne({authorId: userId, projectId: data._id});
        return participation ? participation.text : "";
    }
    return "";
}

Template.projectInfoContent.helpers({
    addCommentStatus: () => Template.instance().commentDisabled.get() ? "disabled" : "",
    filter: () => Template.instance().data ? {"docId": Template.instance().data._id} : null,
    showParticipationForm: () => {
        return Template.instance().editParticipation.get() || !findUserParticipation(Meteor.userId(), Template.instance().data)
    },
    userParticipation: () => findUserParticipation(Meteor.userId(), Template.instance().data)
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
    },
    "submit #participationForm": function (e) {
        e.preventDefault();
        const instance = Template.instance();
        if (addParticipation.value && instance.data && Meteor.userId()) {
            Meteor.call("upsertProjectParticipation", instance.data._id, addParticipation.value,
                function (err, res) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        addParticipation.value = "";
                        instance.editParticipation.set(false);
                    }
                });
        }
    },
    "click #editParticipation": function (e) {
        e.preventDefault();
        Template.instance().editParticipation.set(true);
    },
    "click #removeParticipation": function (e) {
        e.preventDefault();
        const instance = Template.instance();
        Meteor.call("removeProjectParticipation", instance.data._id,
            (err, res) => {
                if (err) {
                    console.error(err);
                }
            });
    }


});