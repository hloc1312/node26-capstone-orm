const express = require("express");
const authRouter = require("./auth.routes");
const routerComment = require("./comment.routes");
const routerImage = require("./image.routes");
const userRouter = require("./user.routes");

const v1 = express.Router();

v1.use("/users", userRouter);

v1.use("/auth", authRouter);
v1.use("/images", routerImage);
v1.use("/comments", routerComment);
module.exports = v1;
