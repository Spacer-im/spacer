Template.tagsList.helpers({
    fullTags: function() {
        return Tags.find({_id: {$in: this.tags}});
    }
});