if (Meteor.isServer) {
    process.env.AWS_ACCESS_KEY_ID = Meteor.settings.aws.accessKeyId;
    process.env.AWS_SECRET_ACCESS_KEY = Meteor.settings.aws.secretAccessKey;
}

var createThumb = function (fileObj, readStream, writeStream) {
    if (gm) {
        gm(readStream, fileObj.name()).resize(null, '200').stream().pipe(writeStream);
    }
    else {
        readStream.pipe(writeStream);
    }
};
var resizeSmall = function (fileObj, readStream, writeStream) {
    if (gm) {
        gm(readStream, fileObj.name()).resize('300', '300').stream().pipe(writeStream);
    }
    else {
        readStream.pipe(writeStream);
    }
};

NewsImages = new FS.Collection("newsImages", {
    stores: [
        new FS.Store.FileSystem("newsThumbs",
            {
                path: (Meteor.settings.imagePath ? Meteor.settings.imagePath : "~/upload/") + "thumbs",
                transformWrite: createThumb
            }),
        new FS.Store.S3("newsCovers", {
            bucket: "spacerstore", //required
            ACL: "public-read", //optional, default is 'private', but you can allow public or secure access routed through your app URL
            folder: "news" //optional, which folder (key prefix) in the bucket to use
        })]
});

Thumbs = new FS.Collection("thumbs", {
    stores: [new FS.Store.FileSystem("images",
        {
            path: (Meteor.settings.imagePath ? Meteor.settings.imagePath : "~/upload/") + "thumbs",
            transformWrite: createThumb
        })]
});


Avatars = new FS.Collection("avatars", {
    stores: [new FS.Store.FileSystem("userImages",
        {
            path: (Meteor.settings.imagePath ? Meteor.settings.imagePath : "~/upload/") + "avatars",
            transformWrite: resizeSmall
        })]
});

Avatars.files.before.insert(function (userId, doc) {
    doc.owner = userId;
});



var personalProjectImagesS3 = new FS.Store.S3("personalProjectImagesFull", {
    bucket: "spacerstore", //required
    ACL: "public-read", //optional, default is 'private', but you can allow public or secure access routed through your app URL
    folder: "images" //optional, which folder (key prefix) in the bucket to use
});

var profileSmall = new FS.Store.FileSystem("personalProjectImagesSmall",
    {
        path: (Meteor.settings.imagePath ? Meteor.settings.imagePath : "~/upload/") + "profile_small",
        transformWrite: resizeSmall
    });

ProjectImages = new FS.Collection("personalProjectImages", {
    stores: [profileSmall, personalProjectImagesS3],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});


ProjectImages.files.before.insert(function (userId, doc) {
    doc.owner = userId;
});
