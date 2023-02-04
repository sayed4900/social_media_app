const path = require("path");
const express = require("express");
const morgan = require("morgan");
var bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const viewRoutes = require("./routes/viewRoutes");

const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false })); // to can get data from input ejs

app.use(bodyParser.json());

app.use(express.json({ limit: "10kb" }));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.cookies);
    console.log(path.join(__dirname, "views"));
    next();
});

app.use("/", authRoutes);
app.use("/user", viewRoutes);
app.use("/post", postRoutes);
module.exports = app;
