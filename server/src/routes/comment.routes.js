const express = require("express");
const commentController = require("../controllers/comment.controller");
const routerComment = express.Router();

routerComment.post(
  "/user/:userId/image/:imageId",
  commentController.createComment()
);
module.exports = routerComment;
