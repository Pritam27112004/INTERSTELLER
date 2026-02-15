const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=60",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=60"
        : v,
  },

  price: {
    type: Number,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  // 🔥 Internship-Specific Fields

  wifiSpeed: {
    type: String,
  },

  internDuration: {
    type: String,
  },

  distanceFromTechPark: {
    type: String,
  },

  studyDesk: {
    type: Boolean,
    default: false,
  },

  powerBackup: {
    type: Boolean,
    default: false,
  },

  cctv: {
    type: Boolean,
    default: false,
  },

  biometricEntry: {
    type: Boolean,
    default: false,
  },

  genderType: {
    type: String,
    enum: ["Boys Only", "Girls Only", "Co-Living"],
    default: "Co-Living",
  },

  roomType: {
    type: String,
    enum: ["Private", "Shared"],
    default: "Shared",
  },

  mealsIncluded: {
    type: Boolean,
    default: false,
  },

  laundry: {
    type: Boolean,
    default: false,
  },

  nearCompanies: [
    {
      type: String,
    },
  ],

  internFriendlyRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },

  verifiedByPlatform: {
    type: Boolean,
    default: false,
  },

  workspaceType: {
    type: String,
    enum: ["Private Study Room", "Common Workspace"],
  },

  metroDistance: {
    type: String,
  },

  availableFrom: {
    type: Date,
  },

  recommendedFor: [
    {
      type: String,
    },
  ],
});


const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;