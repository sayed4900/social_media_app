const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const { find } = require("../models/User");

exports.getSignup = catchAsync(async (req, res, next) => {
    res.render("signup.ejs");
});

exports.postSignup = catchAsync(async (req, res, next) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    let user = await User.find({ username, email });
    // console.log("👎🏽", user);
    // if (user) res.redirect("/user/signup");
    //
    user = await User.create({ username, email, password });
    console.log(user);
    res.status(201).render("login", { user });
});

exports.getLogin = catchAsync(async (req, res, next) => {
    res.render("login.ejs");
});
exports.postLogin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    console.log(user);
    if (!user || !(await user.correctPassword(password, user.password)))
        res.redirect("/user/login");
    res.render("profile", { user });
});
