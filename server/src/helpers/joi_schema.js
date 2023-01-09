const Joi = require("joi");

const email = Joi.string().email().required();
const hoTen = Joi.string().required();
const matKhau = Joi.string().required();

module.exports = {
  email,
  hoTen,
  matKhau,
};
