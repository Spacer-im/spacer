Meteor.methods({
    updateFromGlassDoor: function(companyId) {
        if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            throw new Meteor.Error("not-authorized");
        }
        let company = Companies.findOne(companyId);
        if (!company.glassDoorId) {
            console.error(`Not Found glassDoorId for ${companyId}`);
            return false;
        }
        if (Meteor.isServer) {
            GlassDoor.getInfo(company.name, company.glassDoorId, function (data) {
                Companies.update(companyId, {$set: {glassDoorData: data}});
            });
        }
    }
});