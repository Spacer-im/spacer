Template.projectItem.helpers({
    projectImage: function () {
        return this.imageId ? ProjectImages.findOne(this.imageId) : {url: "/icons/logo-cut.png", onlySmall: true};
    }
});