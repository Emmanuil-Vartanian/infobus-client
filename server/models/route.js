const { Schema, model } = require("mongoose");

const routeSchema = new Schema(
  {
    departure: {
      type: {},
      required: [true, "Departure point is required"],
    },
    arrival: {
      type: {},
      required: [true, "Arrival point is required"],
    },
    points: {
      type: [],
      required: [true, "Points is required"],
    },
    directions: {
      type: [],
      required: [true, "Directions is required"],
    },
    distance: {
      type: String,
    },
    route_number_id: {
      type: Number,
      default: 1,
    },
    reverse_route_number_id: {
      type: Number,
    },
    reverse_route_id: {
      type: Schema.Types.ObjectId,
      ref: "route",
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

const Route = model("route", routeSchema);

module.exports = Route;
