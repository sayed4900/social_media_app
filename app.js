const path = require("path");
const express = require("express");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");

const app = express();

const cookieParser = require("cookie-parser");
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

app.use("/", authRoutes);
module.exports = app;
