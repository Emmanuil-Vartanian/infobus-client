const { Schema, model } = require("mongoose");

const directionSchema = new Schema(
  {
    departure: {
      type: {},
      required: [true, "Departure is required"],
    },
    arrival: {
      type: {},
      required: [true, "Arrival is required"],
    },
    main_trip_direction: {
      type: {},
      required: [true, "Main trip direction is required"],
    },
    duration: {
      type: {},
    },
    prices: {
      type: {},
      required: [true, "Prices is required"],
    },
    seats: {
      type: {},
      default: {},
    },
    seats_count: Number,
    seats_selection: {
      type: Boolean,
      default: false,
    },
    direct: {
      type: Boolean,
      default: true,
    },
    stops: {
      type: Boolean,
      default: false,
    },
    stops_nubmer: {
      type: Number,
    },
    direction_number_id: {
      type: Number,
    },
    dfb_order: {
      type: Number,
    },
    reverse_direction_number_id: {
      type: Number,
    },
    reverse_direction_id: {
      type: Schema.Types.ObjectId,
      ref: "direction",
    },
    trip_id: {
      type: Schema.Types.ObjectId,
      ref: "trips",
    },
    trip_number_id: Number,
    reverse_trip_id: {
      type: Schema.Types.ObjectId,
      ref: "trips",
    },
    reverse_trip_number_id: Number,
    creator_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    consolidator_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    consolidator_name: String,
    carrier_id: {
      type: Schema.Types.ObjectId,
      ref: "carriers",
    },
    carrier_name: String,
    active: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Direction = model("direction", directionSchema);

module.exports = Direction;
