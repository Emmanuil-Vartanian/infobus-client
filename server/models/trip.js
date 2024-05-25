const { Schema, model } = require("mongoose");

const tripSchema = new Schema(
  {
    departure: {
      type: {},
      required: [true, "Departure is required"],
    },
    arrival: {
      type: {},
      required: [true, "Arrival is required"],
    },
    points: {
      type: [],
      required: [true, "Points is required"],
    },
    directions: {
      type: [],
      required: [true, "Directions is required"],
    },
    total_duration: {
      type: {},
      // required: [true, "Prices is required"],
    },
    prices: {
      type: {},
      required: [true, "Prices is required"],
    },
    discounts: {
      type: [],
    },
    baggage: {
      type: [],
    },
    invoice_text: String,
    ticket_text: String,
    transport: {
      type: {},
    },
    seats: {
      type: [],
      default: [],
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
    trip_number_id: {
      type: Number,
      default: 1,
    },
    reverse_trip_number_id: {
      type: Number,
    },
    reverse_trip_id: {
      type: Schema.Types.ObjectId,
      ref: "trip",
    },
    trip_directions_ids: {
      type: [],
    },
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
      updated: {
        date: { type: Date },
        by_id: { type: Schema.Types.ObjectId, ref: "user" },
        data: [],
        list: [],
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

const Trip = model("trip", tripSchema);

module.exports = Trip;
