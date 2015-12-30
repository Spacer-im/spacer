Meteor.methods({
    updateFromGlassDoor: function(companyId) {
        if (!Meteor.userId() || !Roles.userIsInRole(userId, ['admin'])) {
            throw new Meteor.Error("not-authorized");
        }
        let company = Companies.findOne(companyId);
        if (!companyId.glassDoorId) {
            return false;
        }
        if (Meteor.isServer) {
            GlassDoor.getInfo(company.name, company.glassDoorId, function (data) {
                Companies.update(companyId, {glassDoorData: data});
            });
        }
    }
});