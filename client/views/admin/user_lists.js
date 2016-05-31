
// TODO too WET
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
    },
    "click .event-not-registered": function (e) {
        e.preventDefault();
        const eventId = e.target.dataset.id;
        Meteor.call('notInSpEventList', eventId, function(err, fileContent) {
            if(fileContent){
                var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
                saveAs(blob, "notInEventList.csv");
            }
        });
    },
    "click .event-registered": function (e) {
        e.preventDefault();
        const eventId = e.target.dataset.id;
        Meteor.call('spEventList', eventId, function(err, fileContent) {
            if(fileContent){
                var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
                saveAs(blob, "inEventList.csv");
            }
        });
    }

});