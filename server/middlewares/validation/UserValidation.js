const { check, body } = require("express-validator");
const User = require("../../models/User");

exports.userValidationRules = [
  check("email").isEmail().withMessage("Invalid email format").custom(async (val) => {
    const user = await User.findOne({ email: val });
    if (user) {
      throw new Error("Email already exists");
    }
}),
  check("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password at least 8 character"),
  check("role").optional().custom(async (val) => {
    if (val !== "user" && val !== "admin") {
      throw new Error("Invalid role. Must be 'user' or 'admin'");
    }
  }),
];
