const express = require("express");
const viewController = require("../controllers/viewController");

const authController = require("../controllers/authController");

const router = express.Router();

router.get("/signup", viewController.getSignup);
router.post("/signup", viewController.postSignup);
//
router.get("/login", viewController.getLogin);
router.post("/login", viewController.postLogin);
module.exports = router;
