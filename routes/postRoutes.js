const express = require("express");
const upload = require("../middleware/multer");

const postController = require("./../controllers/postController");
const authController = require("./../controllers/authController");

const router = express.Router();

// post
router.get("/feed", postController.allPosts);
router.get("/:id", postController.getPost);
router.post("/creatPost", upload.single('file') ,authController.protect, postController.makePost);
router.delete(
    "/deletePost/:id",
    authController.protect,
    postController.deletePost
);
// likes
router.put(
    "/updateLikes/:id",
    authController.protect,
    postController.updateLikes
);

// comments
// router.get("/show/:id", postController.getPostComments);
// router.post(
//     "/creatComment/:id",
//     authController.protect,
//     postController.makeComment
// );

module.exports = router;
