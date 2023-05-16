const express = require("express");
const authController = require("./../controllers/authController");
const homeController = require("./../controllers/home");

const router = express.Router();

router.get("/", homeController.getIndex);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.signup);
router.get("/profile/:id", authController.getProfile);
router.post("/login", authController.getLogin);
router.post("/login", authController.login);
module.exports = router;
