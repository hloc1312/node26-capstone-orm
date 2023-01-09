const express = require("express");
const { getUser } = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verify_token");

const userRouter = express.Router();

userRouter.get("/", verifyToken, getUser);
module.exports = userRouter;
