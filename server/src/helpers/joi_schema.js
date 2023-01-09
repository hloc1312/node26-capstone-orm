const Joi = require("joi");

const email = Joi.string().email().required();
const hoTen = Joi.string().required();
const matKhau = Joi.string().required();
const id_image = Joi.number().required();
const id_user = Joi.number().required();

module.exports = {
  email,
  hoTen,
  matKhau,
  id_image,
  id_user,
};
