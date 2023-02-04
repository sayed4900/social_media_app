const { promisify } = require("util");
const catchAsync = require("./../utils/catchAsync");
const User = require("../models/User");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

// Sending JWT via cookie

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        // secure: true,
    };
    if (process.env.NODE_ENV === "prodution") cookieOptions.secure = true;
    res.cookie("jwt", token, cookieOptions);

    // remove password from output
    // user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data: { user },
    });
};
exports.signup = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    // res.json({ newUser });
    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password)
        return next(new AppError("Please Provide email and password", 400));
    // 2) Check if user exists && password is correct

    const user = await User.findOne({ email }).select("+password");
    // const correct = await user.correctPassword(password, user.password);
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect email or password", 401)); //401 unauthorized
    }
    // 3)if everything ok, send token to client

    createSendToken(user, 200, res);
});

exports.getProfile = catchAsync(async (req, res, next) => {
    // get user
    console.log(req.params);
    const user = await User.findById(req.params.id);
    console.log(user);

    // get all post for this user
    const userPosts = await Post.find({ user: user._id });
    console.log(userPosts);
    // get all comments for the post
    res.status(200).json({ status: "success", user, userPosts });
});
exports.protect = catchAsync(async (req, res, next) => {
    //1) Get the token and check of it's there
    //
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    console.log(req.cookies.jwt);
    // else if (req.cookies.jwt) {
    //     token = req.cookie.jwt;
    // }
    if (!token)
        return next(
            new AppError(
                "You are't logged in! Please log in to get access ",
                401
            )
        );

    // 2) Verification the token
    //we use promisify to return a promise   promisify(jwt.verify)return a promise to await it
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exist
    const currentUser = await User.findById(decoded.id);
    if (!currentUser)
        return next(
            new AppError(
                "The user belonging to this user does no longer exist.",
                401
            )
        );
    //4) Check if user changed password after token  was issued

    // if (currentUser.changePasswordAfter(decoded.iat)) {
    //     return next(
    //         new AppError(
    //             "User recently changed password! Please log in again",
    //             401
    //         )
    //     );
    // }

    //GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
});
exports.isLoggedIn = catchAsync(async (req, res, next) => {
    if (req.cookies.jwt) {
        // 1) Verification the token
        const decoded = await promisify(jwt.verify)(
            req.cookies.jwt,
            process.env.JWT_SECRET
        );

        // 2) Check if user still exist
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) return next();

        // THERE IS LOGGED USER
        res.locals.user = currentUser;

        return next();
    }
    next();
});
