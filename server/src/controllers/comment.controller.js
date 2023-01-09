const commentService = require("../services/comment.service");
const { id_image, id_user } = require("../helpers/joi_schema");
const Joi = require("joi");
const { AppErorr } = require("../middlewares/handle_error");
const createComment = () => {
  return async (req, res, next) => {
    try {
      const { error } = Joi.object({ id_image, id_user }).validate({
        id_user: req.params.userId,
        id_image: req.params.imageId,
      });
      if (error) {
        throw new AppErorr(400, error.details[0].message);
      }
      const comment = await commentService.createComment(req.params, req.body);
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  createComment,
};
