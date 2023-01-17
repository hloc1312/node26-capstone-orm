const express = require("express");
const routerImage = express.Router();
const imageController = require("../controllers/image.controller");
const uploadCloud = require("../middlewares/uploader");
const verifyToken = require("../middlewares/verify_token");
routerImage.get("/", imageController.getImage());
routerImage.get("/:id", imageController.getImageById());
routerImage.get("/comment/:id", imageController.getCommentByIdImage());
routerImage.get("/save/:id", imageController.getSaveByIdImage());
routerImage.post(
  "/",
  verifyToken,
  uploadCloud.single("file"),
  imageController.createImage()
);
routerImage.delete(
  "/:id",
  verifyToken,

  imageController.deleteImage()
);

module.exports = routerImage;
