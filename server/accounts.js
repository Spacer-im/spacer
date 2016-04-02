Accounts.onCreateUser(function (user, options) {
    if (options.profile) {
        user.profile = options.profile;
    }
    user.createdAt = new Date();
    return user;
});