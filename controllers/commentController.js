const catchAsync = require("../utils/catchAsync");
// const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.makeComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.create({
        comment: req.body.comment,
        user: req.user,
        post: req.params.postid,
    });
    console.log(comment);
    res.status(201).json({ status: "success", comment });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.deleteOne({ _id: req.params.commentid });
    console.log("comment removed " + comment);
    res.redirect("/post/" + req.params.postid);
});
exports.updateComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findByIdAndUpdate(req.params.commentid ,
        {
            comment:req.body.comment
        },
        {
            new:true
        });
    console.log("comment updated " + comment);
    // res.redirect("/post/" + req.params.postid);
    res.status(200).json({status:'success',newComment:comment});
    
});


exports.getPostComments = catchAsync(async (req, res, next) => {
    const comments = await Comment.find({ post: req.params.postid })// maybe error from here here
    res.status(200).render('comment',{
        status: "success",
        result: comments.length,
        comments ,
    });
    // console.log('GET ALL COMMENTs');
    // console.log(comments);
    // console.log(comments[0].post.title);
    // console.log(comments[0].post.caption);
    // console.log(comments[0].user.username);
    // res.status(200).json({
    //     status: "success",
    //     result: comments.length,
    //     comments ,
    // });
});
