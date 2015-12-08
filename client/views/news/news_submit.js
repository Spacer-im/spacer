Template.newsSubmit.events({
    "submit form": function (e) {
        e.preventDefault();
        FlashMessages.clear();

        let news = {
            title: e.target.title.value,
            text: e.target.text.value,
            submitted: new Date()

        };
        if (news.title.length <= 6) {
            FlashMessages.sendError("The title should be more than 6 characters");
            return false;
        }

        //Meteor.call('postInsert', post, function(error, result) {
        //    // display the error to the user and abort
        //    if (error)
        //        return alert(error.reason);
        //
        //    // show this result but route anyway
        //    if (result.postExists)
        //        alert('This link has already been posted');
        //
        //    Router.go('postPage', {_id: result._id});
        //});
    }
});