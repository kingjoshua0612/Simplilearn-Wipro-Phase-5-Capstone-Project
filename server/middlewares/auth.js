const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");

exports.authenticate = asyncHandler(async (req, res, next) => {
  let token;
  let device_id = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (req.cookies.dev_id) {
    device_id = req.cookies.dev_id;
  }

  req.sessionToken = token;

  if (!token) {
    return next(
      new ErrorResponse("You are not logged in. Please login first.", 401)
    );
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    req.user.device_id = device_id;
    next();
  } catch (error) {
    return next(
      new ErrorResponse("You are not logged in. Please login first.", 401)
    );
  }
});

exports.authorize = (user_types) => {
  return (req, res, next) => {
    if (user_types.indexOf(req.user.user_type) > -1) {
      next();
    } else {
      return next(
        new ErrorResponse("You are not authorized to access this resource", 401)
      );
    }
  };
};
