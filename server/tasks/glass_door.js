GlassDoor = {
    optionsBase: {
        "v": 1,
        "format": "json",
        "t.p": Meteor.settings.API.glassDoor.partnerID,
        "t.k": Meteor.settings.API.glassDoor.key,
        "userip": Meteor.settings.API.glassDoor.IP,
        "useragent": "SpacerBot/1.0 (Meteor.HTTP)",
        "action": "employers"
    },
    urlAPI: "http://api.glassdoor.com/api/api.htm",
    getInfo: function (cName, cId, callback) {
        let options = _.clone(this.optionsBase);
        options.q = cName;
        try {
            HTTP.get(this.urlAPI, {params: options}, function (error, response) {
                if (error) {
                    console.error(error);
                    return false;
                }
                let data = JSON.parse(response.content);
                let employers = data && data.response && data.response.employers;
                if (!employers) {
                    console.error(`${cName} with ${cId} not found in glassDoor`);
                    return false;
                }
                for (let emp of employers) {
                    if (emp.exactMatch && emp.id === cId) {
                        callback(emp);
                        return true;
                    }
                }
            })
        } catch (e) {
            console.error(e);
        }

    }
};


Meteor.methods({
    updateFromGlassDoor: function(companyId) {
        if (!Meteor.userId() || !Roles.userIsInRole(userId, ['admin'])) {
            throw new Meteor.Error("not-authorized");
        }
        let company = Companies.findOne(companyId);
        if (!companyId.glassDoorId) {
            return false;
        }
        GlassDoor.getInfo(company.name, company.glassDoorId, function(data) {
            Companies.update(companyId, {glassDoorData: data});
        });
    }
});
