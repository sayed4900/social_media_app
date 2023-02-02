const catchAsync = require("../utils/catchAsync");
const Post = require("../models/Post");

exports.makePost = catchAsync(async (req, res, next) => {
    const post = await Post.create({
        title: req.body.title,
        user: req.user,
        likes: 0,
        caption: req.body.caption,
    });
    res.status(201).json({
        status: "success",
        post,
    });
});
exports.allPosts = catchAsync(async (req, res, next) => {
    const posts = await Post.find();
    res.status(200).json({ status: "success", result: posts.length, posts });
});
