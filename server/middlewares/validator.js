const { body, validationResult } = require("express-validator");

const trimSpaces = (string) => {
  return string.replace(/\s+/g, " ");
};

exports.validEmail = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Please provide a valid email address.")
      .isEmail()
      .withMessage("Please provide a valid email address."),
  ];
};

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
