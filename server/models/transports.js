const { Schema, model } = require("mongoose");

const transportSchema = new Schema(
  {
    license_plate: {
      type: {},
      required: [true, "License plate is required"],
    },
    color: {
      type: {},
      required: [true, "Color is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    seats: {
      type: Number,
      required: [true, "Seats is required"],
    },
    transport_number_id: {
      type: Number,
      default: 1,
    },
    carrier_id: {
      type: Schema.Types.ObjectId,
      ref: "carrier",
      required: [true, "Carrier id is required"],
    },
    carrier_name: {
      type: String,
      required: [true, "Carrier name is required"],
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

const Transport = model("transport", transportSchema);

module.exports = Transport;
