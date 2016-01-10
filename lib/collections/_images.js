var createThumb = function (fileObj, readStream, writeStream) {
    if (gm) {
        gm(readStream, fileObj.name()).resize(null, '200').stream().pipe(writeStream);
    }
    else {
        readStream.pipe(writeStream);
    }
};
var createAvatar = function (fileObj, readStream, writeStream) {
    if (gm) {
        gm(readStream, fileObj.name()).resize(null, '400').crop('400', '400').stream().pipe(writeStream);
    }
    else {
        readStream.pipe(writeStream);
    }
};

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
            path: (Meteor.settings.imagePath ? Meteor.settings.imagePath : "~/upload/") + "avatars"
            //transformWrite: createAvatar
        })]
});

