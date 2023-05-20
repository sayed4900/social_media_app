const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    image: {
        type: String,
        requried: true,
    },
    title: {
        type: String,
        required: true,
    },
    cloudinaryId: {
        type: String,
        require: true,
    },
    caption: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

postSchema.pre(/^find/, function(next) {
    // this points to the current query.
    this.populate({
        path: 'user',
        select: 'username email'
        });
        next();
});


module.exports = mongoose.model("Post", postSchema);
