const express = require("express");
const router = express.Router();

const commentController = require("../controllers/commentController");

router.post(
    "/creatComment/:id",
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
