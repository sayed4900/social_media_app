const express = require("express");
const postController = require("./../controllers/postController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/creatPost", authController.protect, postController.makePost);
router.get("/feed", postController.allPosts);

module.exports = router;
