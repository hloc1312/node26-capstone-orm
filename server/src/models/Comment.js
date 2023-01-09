const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Comment",
    {
      nguoiDungId: {
        type: DataTypes.INTEGER,

        field: "nguoi_dung_id",
      },
      hinhId: {
        type: DataTypes.INTEGER,

        field: "hinh_id",
      },
      ngayBinhLuan: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        field: "ngay_binh_luan",
      },
    },
    {
      tableName: "comments",
      // disable createdAt, updatedAt
      timestamps: false,
    }
  );
};
