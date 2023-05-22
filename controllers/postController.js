const catchAsync = require("../utils/catchAsync");
const cloudinary = require('../middleware/cloudinary')
const Post = require("../models/Post");
const Comment = require("../models/Comment");


// exports.makeComment = catchAsync(async (req, res, next) => {
//     const comment = await Comment.create({
//         comment: req.body.comment,
//         user: req.user,
//         post: req.params.id,
//     });
//     console.log(comment);
//     res.status(201).json({ status: "success", comment });
// });

// exports.getPostComments = catchAsync(async (req, res, next) => {
//     const comments = await Comment.find({ post: req.params.id });
//     res.status(200).json({
//         status: "success",
//         result: comments.length,
//         data: { comments },
//     });
// });

exports.makePost = catchAsync(async (req, res, next) => {
    
    // console.log(req);
    console.log('✈️',req.body);
     
    
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    const post = await Post.create({
        title: req.body.title,
        caption: req.body.caption,
        user: req.user,
        cloudinaryId:result.public_id,
        image:result.secure_url,
        likes: 0,
    });
    
    res.status(201).json({
        status: "success",
        post,
    });
});
exports.getPost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    // get all comments for this post 
    const comments = await Comment.find({post:req.params.id}).sort({createdAt:"desc"}).lean();
    // console.log(" POST:➡️ ",post);
    // console.log('-------------------------------------------------------------');
    // console.log(comments);
    // console.log('-------------------------------------------------------------');

    res.render('post',{title:"Get Post",post,comments,user:req.user});
    // res.status(201).json({
    //     status: "success",
    //     post,
    // });
});



exports.updateLikes = catchAsync(async (req, res, next) => {
    const post = await Post.findByIdAndUpdate(
        req.params.id,
        {
            $inc: { likes: 1 },
        },
        { new: true }
    );
    res.redirect(`/post/${post._id}`)
    // res.status(200).json({ status: "success", post });
});

exports.deletePost = catchAsync(async (req, res, next) => {
    // find post and delete it
    const post = await Post.findByIdAndDelete(req.params.id);
    // delte comments on this post also but first conver post id to object
    const postIdObj = new ObjectId(req.params.id)
    // console.log(postIdObj);
    // await Comment.del(postIdObj);
    const comments = await Comment.deleteMany({post:req.params.id}) ;
    console.log("➡️➡️",comments);
    // delete image from cloudinary
    await cloudinary.uploader.destroy(post.cloudinaryId)
    // 
    res.redirect('/');
    // res.status(204).json({ status: "success" });
});

exports.getFeed = catchAsync(async (req, res, next) => {
    const posts = await Post.find().sort({createdAt:"desc"}).lean();
    console.log(posts);
    res.status(200).render('feed',{ status: "success",posts, result: posts.length,title:"Feed"  });
});
