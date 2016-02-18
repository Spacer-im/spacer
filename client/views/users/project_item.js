Template.projectItem.helpers({
    projectImage: function () {
        return this.imageId ? UserImages.findOne(this.imageId) : {url: "/icons/logo-cut.png"};
    }
});