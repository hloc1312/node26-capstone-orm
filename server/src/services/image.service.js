const { Op } = require("sequelize");
const { AppErorr } = require("../middlewares/handle_error");
const { Image, User } = require("../models");
const cloudinary = require("cloudinary").v2;

const getImage = async ({ page, pageSize, name, ...query }) => {
  try {
    const queries = { raw: true, nest: true };
    const offset = !page || +page <= 1 ? 0 : +page - 1;
    const limit = +pageSize || +process.env.LIMIT_PAGE;

    queries.offset = offset;
    queries.limit = limit;

    if (name) {
      query.tenHinh = { [Op.substring]: name };
    }

    const images = await Image.findAll({
      where: query,
      ...queries,
    });

    return images;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getImageById = async ({ id }) => {
  try {
    const image = await Image.findOne({
      where: { hinhId: id },
      include: {
        association: "userData",
      },
    });
    if (!image) {
      throw new AppErorr(400, "ID Image not exist");
    }
    return image;
  } catch (error) {
    throw error;
  }
};

const getCommentByIdImage = async ({ id }) => {
  try {
    const comment = await Image.findOne({
      where: { hinhId: id },
      include: {
        association: "commentImageData",
      },
    });
    if (!comment) {
      throw new AppErorr(400, "Id Image not existeds");
    }
    return comment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getSaveByIdImage = async ({ id }) => {
  try {
    const save = await Image.findOne({
      where: { hinhId: id },
      include: {
        association: "saveImageData",
      },
    });
    if (!save) {
      throw new AppErorr(400, "Id Image not existeds");
    }
    return save;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createImage = async (data, nguoiDungId, fileData) => {
  try {
    const image = await Image.create({
      ...data,
      nguoiDungId: nguoiDungId,
      duongDan: fileData?.path,
      filename: fileData?.filename,
    });
    return image;
  } catch (error) {
    if (fileData) {
      cloudinary.uploader.destroy(fileData.filename);
    }
    console.log(error);
    throw error;
  }
};

const deleteImage = async ({ id }, requester) => {
  try {
    const image = await Image.findOne({ where: { hinhId: id } });
    if (!image) {
      throw new AppErorr(400, "Image id not existed");
    }
    if (image.nguoiDungId !== requester) {
      throw new AppErorr(403, "No have Permission");
    }
    cloudinary.uploader.destroy(image.filename);
    await Image.destroy({ where: { hinhId: id } });
    return "Delete Success";
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getImage,
  getImageById,
  getCommentByIdImage,
  getSaveByIdImage,
  createImage,
  deleteImage,
};
