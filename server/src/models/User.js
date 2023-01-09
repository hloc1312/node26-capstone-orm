const { DataTypes, QueryInterface } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      nguoiDungId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "nguoi_dung_id",
      },
      hoTen: {
        type: DataTypes.STRING(50),
        field: "ho_ten",
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "email",
        validate: {
          isEmail: {
            msg: "invalid email",
          },
        },
      },
      matKhau: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "mat_khau",
        // validate: {
        //   // Demo custom validatiors
        //   isMatchedConfirmPassword: (value) => {
        //     // logic validation
        //     // Nếu không thoã mãn logic
        //     // throw new Error("message")

        //     if (value !== this.confirmPassword) {
        //       throw new Error("confirm password not match");
        //     }
        //   },
        // },

        // Sẽ được chạy trước khi create/update
        set(value) {
          // Không được lưu plaintext password trực tiếp xuống DB
          // Ta cần hash password bằng thư viện bcrypt
          const salt = bcrypt.genSaltSync();
          const hashedPassword = bcrypt.hashSync(value, salt);

          this.setDataValue("matKhau", hashedPassword);
        },
      },
      tuoi: {
        type: DataTypes.INTEGER,
      },
      duongDan: {
        type: DataTypes.STRING,
        field: "duong_dan",
      },
      anhDaiDien: {
        type: DataTypes.STRING,
        field: "anh_dai_dien",
      },
    },
    {
      tableName: "users",
      // disable createdAt, updatedAt
      timestamps: false,
      // Bỏ qua cái column password khi tìm kiếm các record
      defaultScope: {
        attributes: {
          exclude: ["mat_khau"],
        },
      },
      // Các phương thức được tự động chạy sau một hành động(create/update/delete)
      hooks: {
        // Xoá property password của record được trả ra sau khi create/update thành công
        afterSave: (record) => {
          delete record.dataValues.matKhau;
        },
      },
    }
  );
};
