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
User.hasMany(Image, { as: "imageData", foreignKey: "nguoiDungId" });
Image.belongsTo(User, { as: "userData", foreignKey: "nguoiDungId" });

// User 1 - n Comment
User.hasMany(Comment, { as: "commentData", foreignKey: "nguoiDungId" });
Comment.belongsTo(User, { as: "userCommentData", foreignKey: "nguoiDungId" });

// Image 1 - n Comment
Image.hasMany(Comment, { as: "commentImageData", foreignKey: "hinhId" });
Comment.belongsTo(Image, { as: "imageCommentData", foreignKey: "hinhId" });

// User 1 - n SaveImage
User.belongsToMany(Image, {
  through: SaveImage,
  as: "saveImageData",
  foreignKey: "nguoiDungId",
});
Image.belongsToMany(User, {
  through: SaveImage,
  as: "userSaveImageData",
  foreignKey: "hinhId",
});

// // Image 1 - n SaveImage
// Image.hasMany(SaveImage, { as: "saveImageData", foreignKey: "hinhId" });
// SaveImage.belongsTo(Image, { as: "imageSaveData", foreignKey: "hinhId" });

module.exports = {
  sequelize,
  User,
  Image,
  Comment,
  SaveImage,
};
