const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },

    description: String,
    shortDescription: String,

    destination: String,
    departureLocation: String,

    price: { type: Number, required: true },
    discountPrice: Number,

    duration: String,

    maxGroupSize: Number,
    minAge: Number,

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    images: [String],

    itinerary: [
      {
        day: Number,
        title: String,
        description: String,
      },
    ],

    included: [String],
    excluded: [String],

    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },

    startDates: [Date],
    isAvailable: { type: Boolean, default: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Package", packageSchema);
