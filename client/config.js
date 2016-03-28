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
        }
    ]
});
