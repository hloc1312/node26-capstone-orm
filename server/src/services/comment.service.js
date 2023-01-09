const { AppErorr } = require("../middlewares/handle_error");
const { User, Image } = require("../models");

const createComment = async ({ userId, imageId }, data) => {
  try {
    console.log(data);
    const user = await User.findOne({ where: { nguoiDungId: userId } });
    if (!user) {
      throw new AppErorr(400, "User not existed");
    }
    const image = await Image.findOne({ where: { hinhId: imageId } });
    if (!image) {
      throw new AppErorr(400, "Image not existed");
    }
    await image.createCommentImageDatum({
      nguoiDungId: userId,
      hinhId: imageId,
      noiDung: data.noiDung,
    });
    // console.log(image.__proto__);
    return "OK";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  createComment,
};
