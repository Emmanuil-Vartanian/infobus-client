const { Schema, model } = require("mongoose");

const locationSchema = new Schema(
  {
    country: {
      type: {},
      required: [true, "Country is required"],
    },
    city: {
      type: {},
      required: [true, "City is required"],
    },
    distance: Number,
    address: {
      type: {},
    },
    name: {
      type: {},
    },
    location_number_id: {
      type: Number,
      // default: 1,
    },
    creator_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
    deleted: {
      type: Boolean,
    },
    restored: {
      type: Boolean,
    },
    history: {
      created: {
        date: { type: Date, default: Date.now },
        by_id: { type: Schema.Types.ObjectId, ref: "user" },
      },
      deleted: {
        date: { type: Date },
        by_id: { type: Schema.Types.ObjectId, ref: "user" },
      },
      restored: {
        date: { type: Date },
        by_id: { type: Schema.Types.ObjectId, ref: "user" },
      },
    },
  },
  { versionKey: false, timestamps: true }
);

const Location = model("location", locationSchema);

module.exports = Location;
