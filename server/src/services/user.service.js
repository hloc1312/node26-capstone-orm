const { AppErorr } = require("../middlewares/handle_error");
const { User } = require("../models");
const SaveImage = require("../models/SaveImage");
const cloudinary = require("cloudinary").v2;

const getUser = async ({ page, pageSize }) => {
  try {
    const queries = { raw: true, nest: true };
    const offset = !page || +page <= 1 ? 0 : +page - 1;
    const limit = +pageSize || +process.env.LIMIT_PAGE;
    queries.offset = offset;
    queries.limit = limit;

    // console.log(queries);
    const users = await User.findAndCountAll({ ...queries });
    return users;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

const getImageSaveById = async ({ id }) => {
  try {
    const user = await User.findOne({
      where: { nguoiDungId: id },
      include: {
        association: "saveImageData",
      },
    });
    if (!user) {
      throw new AppErorr(400, "User not existed");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const getImageById = async ({ id }) => {
  try {
    const user = await User.findOne({
      where: { nguoiDungId: id },
      include: {
        association: "imageData",
      },
    });
    if (!user) {
      throw new AppErorr(400, "User not existed");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const updateProfile = async ({ id }, data, fileData) => {
  try {
    const user = await User.findOne({ where: { nguoiDungId: id } });
    if (!user) {
      if (fileData) {
        cloudinary.uploader.destroy(fileData.filename);
      }
      throw new AppErorr(400, "User not existed");
    }

    if (fileData) {
      cloudinary.uploader.destroy(user.duongDan);
      data.anhDaiDien = fileData?.path;
    }
    const userUpdate = await User.update(
      { ...data, duongDan: fileData?.filename },
      { where: { nguoiDungId: id } }
    );
    return `${userUpdate} update success`;
  } catch (error) {
    if (fileData) {
      cloudinary.uploader.destroy(fileData.filename);
    }
    throw error;
  }
};

const saveImage = async (idNguoiDung, idHinhAnh) => {
  try {
    const user = await User.findOne({ where: { nguoiDungId: idNguoiDung } });
    if (!user) {
      throw new AppErorr(400, "Id user not existed");
    }

    // console.log(user.nguoiDungId);
    const hasSaveImage = await user.hasSaveImageData(+idHinhAnh);
    if (hasSaveImage) {
      await user.removeSaveImageData(+idHinhAnh);
    } else {
      await user.addSaveImageDatum(+idHinhAnh);
    }

    // console.log(user.__proto__);
    return "OK";
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getUser,
  getImageSaveById,
  getImageById,
  updateProfile,
  saveImage,
};
