Accounts.ui.config({
    forceEmailLowercase: true,
    forceUsernameLowercase: true,
    passwordSignupFields: "USERNAME_AND_EMAIL",
    extraSignupFields: [
        {
            fieldName: 'subscribeDigest',
            fieldLabel: 'Keep me updated on the latest space news and career opportunities',
            inputType: 'checkbox',
            visible: true,
            saveToProfile: true
        },
        {
            fieldName: 'isPrivate',
            fieldLabel: 'Make my profile visible and allow space companies contact me with interesting job offers',
            inputType: 'checkbox',
            visible: true,
            saveToProfile: true
        }
    ]
});
