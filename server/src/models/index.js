// Setup Sequelize
const { Sequelize } = require("sequelize");
require("dotenv").config({ path: "../../.env" });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize Connected");
  } catch (error) {
    console.log("Sequelize Connect Fail " + error);
  }
})();

//  Khỏi tạo model
const User = require("./User")(sequelize);
const Image = require("./Image")(sequelize);
const Comment = require("./Comment")(sequelize);
const SaveImage = require("./SaveImage")(sequelize);

// Định nghĩa relationship giữa các model
// User 1 - n Image
User.hasMany(Image, { as: "userData", foreignKey: "nguoiDungId" });
Image.belongsTo(User, { as: "imageData", foreignKey: "nguoiDungId" });

// User 1 - n Comment
User.hasMany(Comment, { as: "userCommentData", foreignKey: "nguoiDungId" });
Comment.belongsTo(User, { as: "commentUserData", foreignKey: "nguoiDungId" });

// Image 1 - n Comment
Image.hasMany(Comment, { as: "imageCommentData", foreignKey: "hinhId" });
Comment.belongsTo(Image, { as: "commentImageData", foreignKey: "hinhId" });

// User 1 - n SaveImage
User.hasMany(SaveImage, { as: "userSaveData", foreignKey: "nguoiDungId" });
SaveImage.belongsTo(User, { as: "saveUserData", foreignKey: "nguoiDungId" });

// Image 1 - n SaveImage
Image.hasMany(SaveImage, { as: "imageSaveData", foreignKey: "hinhId" });
SaveImage.belongsTo(Image, { as: "saveImageData", foreignKey: "hinhId" });

module.exports = {
  sequelize,
  User,
  Image,
  Comment,
  SaveImage,
};
