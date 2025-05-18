const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },

    titleAr:{
        type: String,
        required: [true, "Title is required"]
    },

    description: {
        type: String,
        required: [true, "Description is required"]
    },

    descriptionAr:{
        type: String,
        required: [true, "Description is required"]
    },

    image: {
        type: String,
        required: [true, "Image is required"]
    },


    date:{
        type: Date,
        default: Date.now
    },

    counter:{
        type: Number,
        default: 0
    },

    category:{
        type: String,
        required: [true, "Category is required"],
        enum: ["Software Engineer", "Front End", "Back End", "Mobile Application", "Others"],
    },

    venue: {
        type: String,
        required: [true, "Venue is required"]
    },

    price: {
        type: Number,
        required: [true, "Price is required"]
    },
})

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;