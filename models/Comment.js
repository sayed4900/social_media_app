const mongoose = require("mongoose");

const commentScheam = mongoose.Schema({
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

commentScheam.pre(/^find/, function(next){
    this.populate({
        path:'post',
        select:'title likes caption'
    }).populate({
        path:'user',
        select:'username'
    });
    next();
})

module.exports = mongoose.model("Comment", commentScheam);
