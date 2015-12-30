News = new Mongo.Collection('news');


News.attachSchema({
    title: {
        type: String,
        label: "Title",
        min: 6,
        max: 500
    },
    slug: {
        type: String,
        label: "Slug",
        //unique: true,
        autoform: {
            //readonly: true
        }
    },
    short: {
        type: String,
        label: "Short",
        optional: true,
        autoform: {
            rows: 3
        }
    },
    thumbId: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: "cfs-file",
                collection: "thumbs"
            }
        }
    },
    text: {
        type: String,
        label: "Text",
        autoform: {
            rows: 30,
            type: "markdown"
        }
    },
    tags: {
        type: [String],
        optional: true,
        label: "Tags",
        autoform: {
            options: Tags.helpers.asOptions
        }
    },
    submitted: {
        type: Date,
        autoform: {
            afFieldInput: {
                type: "bootstrap-datetimepicker"
            }
        }
    }
});



News.helpers({
   imageURL: function () {
       let tId = Thumbs.findOne(this.thumbId);
       return this.thumbId && tId ? tId.url() : `/assets/small_random/${Math.floor(Math.random() * 10)}.jpg`;
   }
});