const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { isAuth } = require("../middlewares/auth/isAuth");

const {
  userValidationRules,
} = require("../middlewares/validation/UserValidation");

const {
  validationResults,
} = require("../middlewares/validation/validationResult");

router.post(
  "/register",
  userValidationRules,
  validationResults,
  authController.register
);
router.post("/login", authController.login);

router.get("/is-logged-in", isAuth, authController.isLoggedIn);
module.exports = router;
