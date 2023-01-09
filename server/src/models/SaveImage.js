const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "SaveImage",
    {
      nguoiDungId: {
        type: DataTypes.INTEGER,

        field: "nguoi_dung_id",
      },
      hinhId: {
        type: DataTypes.INTEGER,

        field: "hinh_id",
      },
      ngayLuu: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        field: "ngay_luu",
      },
    },
    {
      tableName: "save_images",
      // disable createdAt, updatedAt
      timestamps: false,
    }
  );
};
