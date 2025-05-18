const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { isAuth } = require("../middlewares/auth/isAuth");
const upload = require("../middlewares/multerMiddleware");

const isRole = require("../middlewares/auth/isRole");

const {
  eventValidationRules,
  updateEventValidationRule,
} = require("../middlewares/validation/eventValidation");

const {
  bookingValidationRules,
} = require("../middlewares/validation/bookingValidation");


const {
  validationResults,
} = require("../middlewares/validation/validationResult");

router.get("/", eventController.getEvents);
router.get("/limited-events", eventController.limitedEvents);

router.post(
  "/",
  isAuth,
  isRole("admin"),
  eventValidationRules,
  validationResults,
  eventController.addEvent
);

router.put(
  "/:id",
  isAuth,
  isRole("admin"),
  updateEventValidationRule,
  validationResults,
  eventController.updateEvent
);

router.post(
  "/upload",
  isAuth,
  isRole("admin"),
  upload.single("image"),
  eventController.uploadFile
);

router.post("/book/:id", isAuth, bookingValidationRules, validationResults, eventController.book);

router.delete("/:id", isAuth, isRole("admin"), eventController.deleteEvent);

router.get("/my-events", isAuth, eventController.getMyEvents);

router.get("/:id", eventController.getEventById);

module.exports = router;
