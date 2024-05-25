const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["ow", "rt"],
      default: "ow",
    },
    price: {
      type: String,
      required: [true, "Price date is required"],
    },
    discount: {},
    seats: [],
    passengers_list: {
      type: [],
      required: [true, "Passengers list is required"],
    },
    payment_place: {
      type: String,
      // enum: ["office", "bus"],
    },
    status: {
      type: String,
      default: "new",
    },
    departure: {},
    arrival: {},
    main_trip_direction: {},

    consolidator_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    consolidator_name: String,
    consolidator_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    consolidator_name: String,
    carrier_id: {
      type: Schema.Types.ObjectId,
      ref: "carriers",
    },
    carrier_name: String,
    agency_id: {
      type: Schema.Types.ObjectId,
      ref: "agencies",
    },
    agency_name: String,
    passengers_contact_tel: String,

    booking_number_id: {
      type: Number,
      default: 1,
    },
    buch: {
      type: Number,
    },

    direction_id: {
      type: Schema.Types.ObjectId,
      ref: "directions",
    },
    direction_number_id: Number,

    trip_id: {
      type: Schema.Types.ObjectId,
      ref: "trips",
    },
    trip_number_id: Number,

    departure_reverse: {},
    arrival_reverse: {},

    reverse_direction_id: {
      type: Schema.Types.ObjectId,
      ref: "directions",
    },
    reverse_direction_number_id: Number,

    reverse_trip_id: {
      type: Schema.Types.ObjectId,
      ref: "trips",
    },
    reverse_trip_number_id: Number,
   
    creator: {
      type: {},
      default: {
        type: "user",
        name: null,
      },
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

const Booking = model("booking", bookingSchema);

module.exports = Booking;
