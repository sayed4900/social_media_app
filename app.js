const path = require("path");
const express = require("express");
const morgan = require("morgan");
var bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

const cookieParser = require("cookie-parser");
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(express.json({ limit: "10kb" }));

app.use("/", authRoutes);
app.use("/post", postRoutes);
module.exports = app;
