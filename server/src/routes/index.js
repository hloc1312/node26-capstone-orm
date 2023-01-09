const express = require("express");
const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");

const v1 = express.Router();

v1.use("/users", userRouter);

v1.use("/auth", authRouter);
module.exports = v1;
