const express = require("express");
const {
  getUser,
  getImageSaveById,
  getImageById,
  updateProfile,
  saveImage,
} = require("../controllers/user.controller");
const uploadCloud = require("../middlewares/uploader");
const verifyToken = require("../middlewares/verify_token");

const userRouter = express.Router();

userRouter.get("/", getUser());
userRouter.get("/save-image/:id", getImageSaveById());
userRouter.get("/image/:id", getImageById());
userRouter.post("/:id/save-image/:idHinhAnh", verifyToken, saveImage());

userRouter.put(
  "/:id",
  verifyToken,
  uploadCloud.single("file"),
  updateProfile()
);
module.exports = userRouter;
