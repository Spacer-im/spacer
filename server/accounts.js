Accounts.onCreateUser(function (options, user) {
    if (options.profile) {
        user.profile = options.profile;
    }
    user.createdAt = new Date();
    return user;
});