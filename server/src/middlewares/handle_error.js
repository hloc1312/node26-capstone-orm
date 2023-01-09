class AppErorr extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleError = (err, req, res, next) => {
  if (!(err instanceof AppErorr)) {
    err = new AppErorr(500, "Internal Server");
  }

  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    message: message,
  });

  next();
};

module.exports = {
  AppErorr,
  handleError,
};
