const userService = require("../services/user.service");
const getUser = () => {
  return async (req, res, next) => {
    try {
      const users = await userService.getUser(req.query);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };
};

const getImageSaveById = () => {
  return async (req, res, next) => {
    try {
      const user = await userService.getImageSaveById(req.params);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
};

const getImageById = () => {
  return async (req, res, next) => {
    try {
      const user = await userService.getImageById(req.params);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
};

const updateProfile = () => {
  return async (req, res, next) => {
    try {
      const fileData = req.file;
      const user = await userService.updateProfile(
        req.params,
        req.body,
        fileData
      );
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
};

const saveImage = () => {
  return async (req, res, next) => {
    try {
      const { id, idHinhAnh } = req.params;

      const user = await userService.saveImage(id, idHinhAnh);
      res.status(200).json("OK");
    } catch (error) {
      throw error;
    }
  };
};

module.exports = {
  getUser,
  getImageSaveById,
  getImageById,
  updateProfile,
  saveImage,
};
