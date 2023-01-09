const imageService = require("../services/image.service");
const { id_image } = require("../helpers/joi_schema");
const Joi = require("joi");
const { AppErorr } = require("../middlewares/handle_error");
const getImage = () => {
  return async (req, res, next) => {
    try {
      const images = await imageService.getImage(req.query);
      res.status(200).json(images);
    } catch (error) {
      next(error);
    }
  };
};

const getImageById = () => {
  return async (req, res, next) => {
    try {
      const { error } = Joi.object({ id_image }).validate({
        id_image: req.params.id,
      });
      if (error) {
        throw new AppErorr(400, error.details[0].message);
      }
      const image = await imageService.getImageById(req.params);
      res.status(200).json(image);
    } catch (error) {
      next(error);
    }
  };
};

const getCommentByIdImage = () => {
  return async (req, res, next) => {
    try {
      const { error } = Joi.object({ id_image }).validate({
        id_image: req.params.id,
      });
      if (error) {
        throw new AppErorr(400, error.details[0].message);
      }
      const image = await imageService.getCommentByIdImage(req.params);
      res.status(200).json(image);
    } catch (error) {
      next(error);
    }
  };
};

const getSaveByIdImage = () => {
  return async (req, res, next) => {
    try {
      const { error } = Joi.object({ id_image }).validate({
        id_image: req.params.id,
      });
      if (error) {
        throw new AppErorr(400, error.details[0].message);
      }
      const image = await imageService.getSaveByIdImage(req.params);
      res.status(200).json(image);
    } catch (error) {
      next(error);
    }
  };
};

const createImage = () => {
  return async (req, res, next) => {
    try {
      const fileData = req.file;
      const { id } = req.user;

      const image = await imageService.createImage(req.body, id, fileData);
      res.status(200).json(image);
    } catch (error) {
      next(error);
    }
  };
};

const deleteImage = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.user;
      const image = await imageService.deleteImage(req.params, id);
      res.status(200).json(image);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getImage,
  getImageById,
  getCommentByIdImage,
  getSaveByIdImage,
  createImage,
  deleteImage,
};
