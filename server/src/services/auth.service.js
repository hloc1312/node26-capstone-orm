const jwt = require("jsonwebtoken");
const { AppErorr } = require("../middlewares/handle_error");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const result = require("dotenv").config({ path: "../../.env" });

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

    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, //Tài khoản gmail vừa tạo
        pass: process.env.EMAIL_PASSWORD, //Mật khẩu tài khoản gmail vừa tạo
      },
      // tls: {
      //   rejectUnauthorized: true,
      //   minVersion: "TLSv1.2",
      // },
    });
    var content = "";
    content += `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Đăng nhập tại link này</h4>
                <a href="${process.env.CLIENT_LOGIN}">Login tai đây</a>
                <span style="color: black">Đây là mail test</span>
            </div>
        </div>
    `;
    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: "hloc878@gmail.com",
      subject: "Register account at Social Nguyen Loc",
      text: "Hello " + response[0].hoTen,
      html: content,
    };

    await transporter.sendMail(mailOptions, function (err) {
      if (err) {
        console.log(err);
      }
      console.log("Send mail success");
    });

    return { data: response[0], token: token };
  } catch (error) {
    // console.log(error);
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
    if (!isChecked) {
      throw new AppErorr(400, "Password is wrong");
    }
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
      info: {
        id: response.nguoiDungId,
        email: response.email,
        tuoi: response.tuoi,
        hoTen: response.hoTen,
      },
    };
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

module.exports = {
  register,
  login,
};
