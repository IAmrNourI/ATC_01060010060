const { check } = require("express-validator");

exports.eventValidationRules = [
  check("title")
    .trim()
    .notEmpty()
    .matches(/^[a-zA-Z0-9\s.,-]+$/)
    .isLength({ min: 3 })
    .withMessage("Title can't be empty."),
  check("description")
    .trim()
    .notEmpty()
    .matches(/^[a-zA-Z0-9\s.,-]+$/)
    .isLength({ min: 10 })
    .withMessage(
      "Description is required and must be at least 10 characters long."
    ),
  check("titleAr")
    .trim()
    .notEmpty()
    .matches(/^[\u0621-\u064A0-9\s.,-]+$/)
    .isLength({ min: 3 })
    .withMessage("Title can't be empty."),
  check("descriptionAr")
    .trim()
    .notEmpty()
    .matches(/^[\u0621-\u064A0-9\s.,-]+$/)
    .isLength({ min: 10 })
    .withMessage(
      "Description is required and must be at least 10 characters long."
    ),
  check("image").trim().notEmpty().withMessage("Image is required."),
  check("date")
    .trim()
    .notEmpty()
    .isISO8601()
    .withMessage({ message: "date must be a date and not Empty" })
    .toDate()
    .custom((val) => {
      const dateNow = new Date(Date.now() + 2 * 60 * 60 * 1000);
      const dateAfter30Days = new Date(
        Date.now() + 2 * 60 * 60 * 1000 + 60 * 24 * 60 * 60 * 1000
      );

      if (val < dateNow) {
        throw new Error("date_time must be in the future.");
      }

      if (val > dateAfter30Days) {
        throw new Error("You can create Events only in 2 months next");
      }
      return true;
    }),
  check("category")
    .trim()
    .notEmpty()
    .isIn([
      "Software Engineer",
      "Front End",
      "Back End",
      "Mobile Application",
      "Others",
    ])
    .withMessage("Category is required."),
  check("price")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("Price is required."),
  check("venue")
    .trim()
    .notEmpty()
    .isString({ min: 20 })
    .withMessage("Venue is required."),
];

exports.updateEventValidationRule = [
  check("title")
    .trim()

    .notEmpty()
    .matches(/^[a-zA-Z0-9\s.,-]+$/)
    .isLength({ min: 3 })
    .withMessage("Title can't be empty."),
  check("description")
    .trim()

    .notEmpty()
    .matches(/^[a-zA-Z0-9\s.,-]+$/)
    .isLength({ min: 10 })
    .withMessage(
      "Description is required and must be at least 10 characters long."
    ),
  check("titleAr")
    .trim()
    .matches(/^[\u0621-\u064A0-9\s.,-]+$/)
    .isLength({ min: 3 })
    .notEmpty()
    .withMessage("Title can't be empty."),
  check("descriptionAr")
    .trim()
    .notEmpty()
    .matches(/^[\u0621-\u064A0-9\s.,-]+$/)
    .isLength({ min: 10 })
    .withMessage(
      "Description is required and must be at least 10 characters long."
    ),
  check("image").trim().notEmpty().withMessage("Image is required."),
  check("date")
    .trim()
    .notEmpty()
    .isISO8601()
    .withMessage({ message: "date must be a date and not Empty" })
    .toDate()
    .custom((val) => {
      const dateNow = new Date(Date.now() + 2 * 60 * 60 * 1000);
      const dateAfter30Days = new Date(
        Date.now() + 2 * 60 * 60 * 1000 + 60 * 24 * 60 * 60 * 1000
      );

      if (val < dateNow) {
        throw new Error("date must be in the future.");
      }

      if (val > dateAfter30Days) {
        throw new Error("You can create Events only in 2 months next");
      }
      return true;
    }),
  check("category")
    .trim()
    .notEmpty()
    .isIn([
      "Software Engineer",
      "Front End",
      "Back End",
      "Mobile Application",
      "Others",
    ])
    .withMessage("Category is required."),
  check("price")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("Price is required."),
  check("venue")
    .trim()
    .notEmpty()
    .isString({ min: 20 })
    .withMessage("Venue is required."),
];
