Schemas.Links = new SimpleSchema({
    website: {
        type: String,
        label: "Website",
        regEx: SimpleSchema.RegEx.Domain,
        optional: true,
        autoform: {
            placeholder: "http://spacer.im"
        }
    },
    linkedin: {
        type: String,
        label: "LinkedIn",
        regEx: SimpleSchema.RegEx.Url,
        optional: true,
        autoform: {
            placeholder: "http://www.linkedin.com/in/???"
        }
    },
    github: {
        type: String,
        label: "Github",
        regEx: SimpleSchema.RegEx.Url,
        optional: true,
        autoform: {
            placeholder: "https://github.com/???"
        }
    },
    facebook: {
        type: String,
        label: "Facebook",
        regEx: SimpleSchema.RegEx.Url,
        optional: true,
        autoform: {
            placeholder: "https://www.facebook.com/???"
        }
    },
    twitter: {
        type: String,
        label: "Twitter",
        regEx: SimpleSchema.RegEx.Url,
        optional: true,
        autoform: {
            placeholder: "http://www.twitter.com/???"
        }
    },
    gplus: {
        type: String,
        label: "Google Plus",
        regEx: SimpleSchema.RegEx.Url,
        optional: true,
        autoform: {
            placeholder: "https://plus.google.com/u/0/???"
        }
    }
});