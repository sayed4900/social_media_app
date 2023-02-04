const catchAsync = require("../utils/catchAsync");
// const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.makeComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.create({
        comment: req.body.comment,
        user: req.user,
        post: req.params.id,
    });
    console.log(comment);
    res.status(201).json({ status: "success", comment });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.deleteOne({ _id: req.params.commentid });
    console.log("comment removed " + comment);
    res.redirect("/post/" + req.params.postid);
});

exports.getPostComments = catchAsync(async (req, res, next) => {
    const comments = await Comment.find({ post: req.params.id });
    res.status(200).json({
        status: "success",
        result: comments.length,
        data: { comments },
    });
});
