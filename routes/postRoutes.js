const express = require("express");
const upload = require("../middleware/multer");

const postController = require("./../controllers/postController");
const authController = require("./../controllers/authController");


const router = express.Router();


router.get("/feed",authController.isLoggedIn, postController.getFeed);
router.get("/:id",authController.protect, postController.getPost);
router.post("/creatPost", upload.single('file') ,authController.protect, postController.makePost);
router.delete(
    "/deletePost/:id",
    authController.protect,
    postController.deletePost,postController.getFeed
);
// likes
router.put(
    "/updateLikes/:id",
    authController.protect,
    postController.updateLikes
);



module.exports = router;
