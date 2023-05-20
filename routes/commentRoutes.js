const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const commentController = require("../controllers/commentController");



router.post(
    "/createComment/:postid",
    authController.protect,
    commentController.makeComment
);
router.delete(
    "/deleteComment/:postid/:commentid",
    authController.protect,
    commentController.deleteComment
);
router.put(
    "/updateComment/:postid/:commentid",
    authController.protect,
    commentController.updateComment
);

// router.get("/show/:id", postController.getPostComments);

module.exports = router;
