Template.userListPage.events({
    "click #allUsers": function (e) {
        e.preventDefault();
        Meteor.call('allUserList', function(err, fileContent) {
            if(fileContent){
                var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
                saveAs(blob, "allUserList.csv");
            }
        });
    },
    "click #subscribedUsers": function (e) {
        e.preventDefault();
        Meteor.call('subscribedList', function(err, fileContent) {
            if(fileContent){
                var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
                saveAs(blob, "digestUserList.csv");
            }
        });
    }
});