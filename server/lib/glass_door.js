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
    processAnswer: function(response, cId, callback) {
        let data = JSON.parse(response.content);
        let employers = data && data.response && data.response.employers;
        if (!employers) {
            console.error(`${cName} with ${cId} not found in glassDoor`);
            return false;
        }
        for (let emp of employers) {
            if (emp.exactMatch && emp.id === cId) {
                if (callback) {
                    callback(emp);
                    return null;
                }
                else {
                    return emp;
                }
            }
        }
    },
    getInfo: function (cName, cId, callback) {
        let options = _.clone(this.optionsBase);
        options.q = cName;
        try {
            if (!callback) {
                let result = HTTP.get(this.urlAPI, {params: options});

                if (result && result.statusCode == 200) {
                    return this.processAnswer(result, cId);
                }
                else {
                    console.error(`${cName} request error ${result && result.statusCode}`);
                }
            }
            else {
                HTTP.get(this.urlAPI, {params: options}, (function (error, response) {
                    if (error) {
                        console.error(error);
                        return false;
                    }
                    this.processAnswer(response, cId, callback);
                }).bind(this));
            }
        } catch (e) {
            console.error(e);
        }

    }
};

