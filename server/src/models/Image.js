const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Image",
    {
      hinhId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "hinh_id",
      },
      tenHinh: {
        type: DataTypes.STRING(),
        field: "ten_hinh",
      },

      duongDan: {
        type: DataTypes.STRING(),
        field: "duong_dan",
      },
      filename: {
        type: DataTypes.STRING(),
      },
      moTa: {
        type: DataTypes.STRING(),
        field: "mo_ta",
      },
      nguoiDungId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "nguoi_dung_id",
      },
    },
    {
      tableName: "images",
      // disable createdAt, updatedAt
      timestamps: false,
    }
  );
};
