const Joi = require("joi");
const authService = require("../services/auth.service");
const { email, hoTen, matKhau } = require("../helpers/joi_schema");
const { AppErorr } = require("../middlewares/handle_error");
const register = () => {
  return async (req, res, next) => {
    try {
      const { error } = Joi.object({ email, hoTen, matKhau }).validate({
        email: req.body.email,
        hoTen: req.body.hoTen,
        matKhau: req.body.matKhau,
      });
      if (error) {
        throw new AppErorr(400, error.details[0].message);
      }
      const response = await authService.register(req.body);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
};

const login = () => {
  return async (req, res, next) => {
    try {
      const { error } = Joi.object({ email, matKhau }).validate(req.body);
      if (error) {
        throw new AppErorr(400, error.details[0].message);
      }
      const response = await authService.login(req.body);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  register,
  login,
};
