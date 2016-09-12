Accounts.onCreateUser(function (options, user) {
    if (options.profile) {
        user.profile = options.profile;
        user.profile.isPrivate = options.isPrivate;
    }
    user.createdAt = new Date();
    return user;
});