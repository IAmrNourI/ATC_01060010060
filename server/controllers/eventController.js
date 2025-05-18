const Event = require("../models/Event");
const deleteImage = require("../utils/deleteImage");
const Booking = require("../models/Booking");
exports.getEvents = async (req, res) => {

  try {
    const events = await Event.find().select("-__v -createdAt -updatedAt");

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const eventsWithUrl = events.map((event) => {
      const obj = event.toObject();
      obj.imageUrl = `${baseUrl}/uploads/${event.image}`;
      return obj;
    });

    res.status(200).json({
      message: "Events fetched successfully",
      data: eventsWithUrl,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.limitedEvents = async (req, res) => {
  try {
    const events = await Event.find({})
      .sort({ createdAt: 1 })
      .limit(6)
      .select("-__v -createdAt -updatedAt");

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const eventsWithUrl = events.map((event) => {
      const obj = event.toObject();
      obj.imageUrl = `${baseUrl}/uploads/${event.image}`;
      return obj;
    });

    res.status(200).json({
      message: "Events fetched successfully",
      data: eventsWithUrl,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.addEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      titleAr,
      descriptionAr,
      date,
      category,
      price,
      venue,
    } = req.body;
    const newEvent = new Event({
      title,
      description,
      image,
      titleAr,
      descriptionAr,
      date,
      category,
      price,
      venue,
    });
    await newEvent.save();
    res.status(201).json({
      message: "Event added successfully",
      data: newEvent,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      image,
      titleAr,
      descriptionAr,
      date,
      category,
      price,
      venue,
    } = req.body;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found", error: true });
    }

    if (image && event.image && event.image !== image) {
      await deleteImage(event.image);
    }

    Object.assign(event, {
      title,
      description,
      image,
      titleAr,
      descriptionAr,
      date,
      category,
      price,
      venue,
    });

    await event.save();

    res.status(200).json({
      message: "Event updated successfully",
      data: event,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: true });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found", error: true });
    }

    await Event.findByIdAndDelete(id);
    deleteImage(event.image);

    return res.status(200).json({
      message: "Event deleted successfully",
      error: false,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, error: true });
  }
};

exports.book = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const booking = await Booking.findOne({ userId, eventId: id });
    if (!booking) {
      const newBooking = new Booking({ userId, eventId: id });
      await newBooking.save();
      const event = await Event.findById(id);
      event.counter += 1;

      await event.save();
      return res.status(201).json({
        message: "Booking added successfully",
        data: newBooking,
        error: false,
      });
    }

    booking.numberOfTickets += 1;
    await booking.save();

    const event = await Event.findById(id);
    event.counter += 1;
    await event.save();
    return res.status(201).json({
      message: "Booking added successfully",
      data: booking,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    return res.status(200).json({
      message: "File Successfully Uploaded",
      image: req.file.filename,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getMyEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ userId }).select(
      "-__v -createdAt -updatedAt"
    );
    res.status(200).json({
      message: "Booking fetched successfully",
      data: bookings,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, error: true });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).select("-__v -createdAt -updatedAt");
    const baseUrl = `${req.protocol}://${req.get("host")}`;

      const obj = event.toObject();
      obj.imageUrl = `${baseUrl}/uploads/${event.image}`;

    res.status(200).json({
      message: "Event fetched successfully",
      data: obj,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};
