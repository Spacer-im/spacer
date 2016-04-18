Template.projectsSidebar.onCreated(function () {
    Session.set("project-word", "");
});

Template.projectList.helpers({
    filter: function () {
        const dict = {};
        if (Session.get("project-word")) {
            const regExpr = {$regex: Session.get("project-word"), $options: '-i'};
            dict["$or"] = [
                {name: regExpr},
                {short: regExpr},
                {keywords: regExpr}
            ]
        }
        return dict;
    }
});

Template.projectsSidebar.events({
    "input #iProjectWord": _.debounce(function (e) {
        const value = e.target.value;
        if (!Session.equals("project-word", value)) {
            Session.set("project-word", value);
        }
    }, 300)

});