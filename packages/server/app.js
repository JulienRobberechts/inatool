var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { handleAllError } = require("./utils/errors");
const { handleValidationError } = require("./utils/errors/ValidationError");

var indexRouter = require("./routes/index");
var trialsRouter = require("./routes/trials");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/trials", trialsRouter);

app.use(handleValidationError);
app.use(handleAllError);

module.exports = app;
