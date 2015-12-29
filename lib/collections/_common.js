Schemas ={};

allowAdmin = function(userId, doc) {
    return userId && Roles.userIsInRole(userId, ['admin']);
};