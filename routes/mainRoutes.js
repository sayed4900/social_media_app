const express = require("express");
const authController = require("./../controllers/authController");
const homeController = require("./../controllers/home");

const router = express.Router();

router.get("/",authController.isLoggedIn, homeController.getIndex);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.signup);
router.get("/profile/:id",authController.protect, authController.getProfile);
router.get("/login", authController.getLogin);
router.post("/login", authController.login);
router.get('/logout',authController.logout)
module.exports = router;
