const jwt = require("jsonwebtoken");
const { AppErorr } = require("../middlewares/handle_error");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const register = async (data) => {
  try {
    const response = await User.findOrCreate({
      where: { email: data.email },
      defaults: {
        ...data,
      },
    });
    if (!response[1]) {
      throw new AppErorr(400, "Email is existed");
    }

    const token = jwt.sign(
      {
        id: response[0].nguoiDungId,
        email: response[0].email,
        tuoi: response[0].tuoi,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );
    return { data: response[0], token: token };
  } catch (error) {
    throw error;
  }
};

const login = async ({ email, matKhau }) => {
  try {
    const response = await User.findOne({ where: { email: email }, raw: true });
    if (!response) {
      throw new AppErorr(400, "Email not existed");
    }
    const isChecked = response && bcrypt.compareSync(matKhau, response.matKhau);

    const token = isChecked
      ? jwt.sign(
          {
            id: response.nguoiDungId,
            email: response.email,
            tuoi: response.tuoi,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "2d",
          }
        )
      : null;
    return {
      data: token ? "Login success" : "Password is wrong",
      access_token: token,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  register,
  login,
};
