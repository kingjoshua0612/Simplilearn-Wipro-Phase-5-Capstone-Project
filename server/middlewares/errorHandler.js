const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  switch (error.name) {
    case "MongoError":
      error.message = "Invalid Request";
      error.statusCode = 400;
      break;
    case "ValidationError":
      error.message = Object.values(err.errors).map((val) => val.message);
      error.statusCode = 400;
      break;
    case "CastError":
      error.message = "Request is made with invalid data";
      error.statusCode = 400;
      break;
  }
  error = new ErrorResponse(error.message, error.statusCode);

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
    debug: err.message,
  });
};

module.exports = errorHandler;
