if (Meteor.isServer) {
    process.env.AWS_ACCESS_KEY_ID = Meteor.settings.aws.accessKeyId;
    process.env.AWS_SECRET_ACCESS_KEY = Meteor.settings.aws.secretAccessKey;
}

var resizeHeight = function (fileObj, readStream, writeStream) {
    if (gm) {
        gm(readStream, fileObj.name()).resize(null, '200').stream().pipe(writeStream);
    }
    else {
        readStream.pipe(writeStream);
    }
};
var resizeAvatar = function (fileObj, readStream, writeStream) {
    if (gm) {
        gm(readStream, fileObj.name()).resize('300', '300').stream().pipe(writeStream);
    }
    else {
        readStream.pipe(writeStream);
    }
};

const S3Images = new FS.Store.S3("fullImages", {
    bucket: "spacerstore", //required
    ACL: "public-read", //optional, default is 'private', but you can allow public or secure access routed through your app URL
    folder: "images" //optional, which folder (key prefix) in the bucket to use
});

const ThumbsImages = new FS.Store.FileSystem("thumbs",
    {
        path: (Meteor.settings.imagePath ? Meteor.settings.imagePath : "~/upload/") + "thumbs",
        transformWrite: resizeHeight
    });

Images = new FS.Collection("images", {
    stores: [ThumbsImages, S3Images]
});

Avatars = new FS.Collection("avatars", {
    stores: [new FS.Store.FileSystem("userImages",
        {
            path: (Meteor.settings.imagePath ? Meteor.settings.imagePath : "~/upload/") + "avatars",
            transformWrite: resizeAvatar
        })]
});

Avatars.files.before.insert(function (userId, doc) {
    doc.owner = userId;
});



const S3UserImages = new FS.Store.S3("userFullImages", {
    bucket: "spacerstore", //required
    ACL: "public-read", //optional, default is 'private', but you can allow public or secure access routed through your app URL
    folder: "user_images" //optional, which folder (key prefix) in the bucket to use
});

var UserThumbsImages = new FS.Store.FileSystem("userThumbs",
    {
        path: (Meteor.settings.imagePath ? Meteor.settings.imagePath : "~/upload/") + "profile_small",
        transformWrite: resizeHeight
    });

UserImages = new FS.Collection("userImages", {
    stores: [UserThumbsImages, S3UserImages],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});


UserImages.files.before.insert(function (userId, doc) {
    doc.owner = userId;
});
