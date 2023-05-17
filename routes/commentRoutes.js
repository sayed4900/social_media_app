const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const commentController = require("../controllers/commentController");

router.get('/:postid',authController.protect ,commentController.getPostComments);
router.post(
    "/creatComment/:postid",
    authController.protect,
    commentController.makeComment
);
router.delete(
    "/deleteComment/:postid/:commentid",
    authController.protect,
    commentController.deleteComment
);
// router.get("/show/:id", postController.getPostComments);

module.exports = router;
