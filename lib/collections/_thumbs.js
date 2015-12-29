var createThumb = function (fileObj, readStream, writeStream) {
    // Transform the image into a 10x10px thumbnail
    if (gm) {
        gm(readStream, fileObj.name()).resize(null, '200').stream().pipe(writeStream);
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


Thumbs.allow({
    insert: allowAdmin,
    update: allowAdmin,
    remove: allowAdmin,
    download: () => true
});