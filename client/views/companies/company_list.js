Template.companyList.onCreated(function () {
    Session.set("company-word", "");
});

Template.companyList.helpers({
    filter: function () {
        const dict = {};
        if (Session.get("company-word")) {
            const regExpr = {$regex: Session.get("company-word"), $options: '-i'};
            dict["$or"] = [
                {name: regExpr},
                {short: regExpr}
            ]
        }
        return dict;
    }
});

Template.companyList.events({
    "input #iCompanyWord": _.debounce(function (e) {
        const value = e.target.value;
        if (!Session.equals("company-word", value)) {
            Session.set("company-word", value);
        }
    }, 300)

});