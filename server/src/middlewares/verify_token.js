const jwt = require("jsonwebtoken");
const { AppErorr } = require("./handle_error");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new AppErorr(401, "Required Authorization");
  }
  const accessToken = token.split(" ")[1];
  jwt.verify(accessToken, process.env.JWT_SECRET, (err, decode) => {
    // console.log(err);
    const isChecked = err instanceof jwt.TokenExpiredError;
    // if (!isChecked) {
    //   throw new AppErorr(401, "Token invalid");
    // }
    if (isChecked) {
      throw new AppErorr(400, "Token expired");
    }

    if (err) {
      throw new AppErorr(400, "Token invalid");
    }

    req.user = decode;
    next();
  });
};

module.exports = verifyToken;
