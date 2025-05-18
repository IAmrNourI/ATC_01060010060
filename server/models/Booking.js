const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    numberOfTickets: {
        type: Number,
        default: 1,
        required: true
    }

})

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking